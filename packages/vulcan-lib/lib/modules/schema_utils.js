import _reject from 'lodash/reject';
import _keys from 'lodash/keys';
import { Collections } from './collections.js';
import { getNestedSchema, getArrayChild, isBlackbox } from 'meteor/vulcan:lib/lib/modules/simpleSchema_utils';
import _isArray from 'lodash/isArray';
import SimpleSchema from 'simpl-schema';

export const createSchema = (schema, options) => {
  const modifiedSchema = schema;
  Object.keys(modifiedSchema).forEach(fieldName => {
    const field = schema[fieldName];
    const { arrayItem, resolveAs } = field;
    // find any field with an `arrayItem` property defined and add corresponding
    // `foo.$` array item field to schema
    if (arrayItem) {
      modifiedSchema[`${fieldName}.$`] = arrayItem;
    }
    // backwards compatibility: copy resolveAs.type to resolveAs.typeName
    if (resolveAs) {
      field.resolveAs.typeName = field.resolveAs.type;
    }
  });
  return new SimpleSchema(modifiedSchema);
};

/* getters */
// filter out fields with "." or "$"
export const getValidFields = schema => {
    return Object.keys(schema).filter(fieldName => !fieldName.includes('$') && !fieldName.includes('.'));
};

// NOTE: this include fields that should'n't go into the default fragment (pure virtual fields and resolved fields)
// use getFragmentFieldNames for fragments
export const getReadableFields = schema => {
    // OpenCRUD backwards compatibility
    return getValidFields(schema).filter(fieldName => schema[fieldName].canRead || schema[fieldName].viewableBy);
};

export const getCreateableFields = schema => {
    // OpenCRUD backwards compatibility
    return getValidFields(schema).filter(fieldName => schema[fieldName].canCreate || schema[fieldName].insertableBy);
};


export const getUpdateableFields = schema => {
    // OpenCRUD backwards compatibility
    return getValidFields(schema).filter(fieldName => schema[fieldName].canUpdate || schema[fieldName].editableBy);
};

/*

Test if a schema non-nested  field should be added to the GraphQL schema or not.
Rule: we always add it except if:

1. addOriginalField: false is specified in one or more resolveAs fields
2. A resolveAs field has the same name as the main field (we don't want two fields with same name)
3. A resolveAs field doesn't have a name (in which case it will take the name of the main field)

*/
export const shouldAddOriginalField = (fieldName, field) => {
    if (!field.resolveAs) return true;

    const resolveAsArray = Array.isArray(field.resolveAs) ? field.resolveAs : [field.resolveAs];

    const removeOriginalField = resolveAsArray.some(
        resolveAs =>
            resolveAs.addOriginalField === false ||
            resolveAs.fieldName === fieldName ||
            typeof resolveAs.fieldName === 'undefined'
    );
    return !removeOriginalField;
};
// list fields that can be included in the default fragment for a schema
export const getFragmentFieldNames = ({ schema, options }) => _reject(_keys(schema), fieldName => {
    /*
   
    Exclude a field from the default fragment if
    1. it has a resolver and original field should not be added
    2. it has $ in its name
    3. it's not viewable (if onlyViewable option is true)
    4. it is not a reference type (typeName is defined for the field or an array child)
    */
    const field = schema[fieldName];

    // OpenCRUD backwards compatibility
    return (field.resolveAs && !shouldAddOriginalField(fieldName, field))
        || fieldName.includes('$') || fieldName.includes('.')
        || options.onlyViewable && !(field.canRead || field.viewableBy)
        || field.typeName || schema[`${fieldName}.$`] && schema[`${fieldName}.$`].typeName;
});

/*

Check if a type corresponds to a collection or else 
is just a regular or custom scalar type.

*/
export const isCollectionType = typeName => Collections.some(c => c.options.typeName === typeName || `[${c.options.typeName}]` === typeName);

/**
 * Iterate over a document fields and run a callback with side effect
 * Works recursively for nested fields and arrays of objects (but excluding blackboxed objects, native JSON, and arrays of native values)
 * @param {*} document Current document
 * @param {*} schema Document schema
 * @param {*} callback Called on each field with the corresponding field schema, including fields of nested objects and arrays of nested object
 * @param {*} currentPath Global path of the document (to track recursive calls)
 * @param {*} isNested Differentiate nested fields
 */
export const forEachDocumentField = (document, schema, callback, currentPath = '') => {
    if (!document) return;
    Object.keys(document).forEach(fieldName => {
        const fieldSchema = schema[fieldName];
        callback({ fieldName, fieldSchema, currentPath, document, schema, isNested: !!currentPath });
        // Check if we need a recursive call
        if (!fieldSchema) return; // field has no corresponding schema, we are done
        const value = document[fieldName];
        if (!value) return;
        // if value is an array, validate permissions for all children
        if (_isArray(value)) {
            const arrayChildField = getArrayChild(fieldName, schema);
            if (arrayChildField) {
                const arrayFieldSchema = getNestedSchema(arrayChildField);
                // apply only if the field is an array of objects
                if (arrayFieldSchema) {
                    value.forEach((item, idx) => {
                        forEachDocumentField(item, arrayFieldSchema, callback, `${currentPath}${fieldName}[${idx}].`);
                    });
                }
            }
            // if value is an object, run recursively
        } else if (typeof value === 'object' && !isBlackbox(fieldSchema)) {
            const nestedFieldSchema = getNestedSchema(fieldSchema);
            if (nestedFieldSchema) {
                forEachDocumentField(value, nestedFieldSchema, callback, `${currentPath}${fieldName}.`);
            }
        }
    });
};