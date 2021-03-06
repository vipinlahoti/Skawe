import { Components, registerComponent, withCurrentUser, withMulti2 } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Tab, Nav } from 'react-bootstrap';

class CreateCloudInstanceAppsPage extends Component {
  state = {
    selectRegion: [],
    selectDistribution: [],
    selectApp: [],
    selectLabel: '',
    selectRootPassword: '',
    selectServerPlans: [],
    selectAddonPrices: [],
    selectAddonPlans: [],
    selectPasswordStrength: '',
    addonPlans: [
        {
          id: 'enable-backup',
          label: 'Enable Backup',
          autoLabel: 'Auto Backup Enabled',
          autoEnable: this.props.currentUser.autoBackup,
          priceMo: '',
          priceHr: '',
          description: 'Three backup slots are executed and rotated automatically: a daily backup, a 2-7 day old backup, and an 8-14 day old backup. Plans are priced according to the Linode plan selected above.'
        },
        {
          id: 'private-ip',
          label: 'Private IP',
          priceMo: '',
          priceHr: '',
          description: 'Add an Internal IP to this VM.'
        }
      ]
  }

  selectedDistribution = (setDistribution) => {
    this.setState({
      selectDistribution: setDistribution
    });
  }

  selectedApp = (setApp) => {
    this.setState({
      selectApp: setApp
    });
  }

  selectedRegion = (setRegion) => {
    this.setState({
      selectRegion: setRegion
    });
  }

  selectedPlans = (setServerPlans) => {
    this.setState({
      selectAddonPrices: setServerPlans,
      selectServerPlans: setServerPlans
    });
  }

  selectedLabel = (setLabel) => {
    this.setState({
      selectLabel: setLabel
    });
  }

  selectedRootPassword = (setRootPassword) => {
    this.setState({
      selectRootPassword: setRootPassword
    });
  }

  selectedAddonPlans = (setAddonPlans) => {
    const selectAddon = [];

    for (let i = 0; i < setAddonPlans.length; i++) {
      if (setAddonPlans[i].show) {
        if (setAddonPlans[i].id === 'enable-backup') {
          setAddonPlans[i]['priceMo'] = this.state.selectAddonPrices[6];
        }
        selectAddon.push(setAddonPlans[i])
      }
    }

    this.setState({
      selectAddonPlans: selectAddon
    });
  }

  passwordStrength = getStrength => {
    this.setState({
      selectPasswordStrength: getStrength
    });
  }

  render() {
    const { 
      selectDistribution,
      selectApp,
      selectRegion,
      selectLabel,
      selectRootPassword,
      selectPasswordStrength,
      selectServerPlans,
      addonPlans,
      selectAddonPrices,
      selectAddonPlans
    } = this.state;

    const currentUser = this.props.currentUser;
    const userId = currentUser._id;
    const userAutoBackup = currentUser.autoBackup;

    return (
      <React.Fragment>
        <Components.HeadTags title="Cloud Instances" description="Cloud Instances Page" />

        <Container>
          <Row>
            <Col md={8} sm={8} xs={12}>
              <div className="section-xsmall">
                <h5 className="title-5 mb-1">Create a Cloud Instance</h5>
              </div>

              <div className="flex-column nav nav-pills" role="tablist">
                <div className="nav-item">
                  <Link to={{ pathname: '/accounts/list-cloud-instance/create' }} className="nav-link" role="tab">
                    Distribution
                  </Link>
                </div>
                <div className="nav-item">
                  <Link to={{ pathname: '/accounts/list-cloud-instance/create/click-apps' }} className="nav-link active" role="tab">
                    Choose an App
                  </Link>
                </div>
              </div>

              <div className="tab-content">
                <Components.ClickAppsSelect
                  title="Select App"
                  placeholder="-- Select an App --"
                  selectedApp={this.selectedApp}
                />

                <Components.RegionSelect
                  title="Choose a Region"
                  placeholder="-- Select a Region --"
                  showSpeedTest={true}
                  selectedRegion={this.selectedRegion}
                />

                <Components.InstancePlans
                  title="Choose a Plan"
                  selectedPlans={this.selectedPlans}
                  input={{ sort: {createdAt: 'asc'} }}
                />
                
                <Components.RootPassword
                  selectedRootPassword={this.selectedRootPassword}
                  passwordStrength={this.passwordStrength}
                />

                <Components.AdditionalFeatures
                  selectedAddonPrices={selectAddonPrices}
                  addonPlans={addonPlans}
                  selectedAddonPlans={this.selectedAddonPlans}
                  userAutoBackup={userAutoBackup}
                />
              </div>
            </Col>

            <Col md={4} sm={4} xs={4}>
              <Components.PriceSummary
                apps={selectApp}
                distribution={selectDistribution}
                region={selectRegion}
                serverPlans={selectServerPlans}
                serverLabel={selectLabel}
                rootPassword={selectRootPassword}
                passwordStrength={selectPasswordStrength}
                addOnsPlans={selectAddonPlans}
                userId={userId}
              />
            </Col>
          </Row>
        </Container>

      </React.Fragment>
    )
  }
}

registerComponent({ name: 'CreateCloudInstanceAppsPage', component: CreateCloudInstanceAppsPage, hocs: [withCurrentUser] });
