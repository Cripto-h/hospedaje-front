import React from "react";
import axios from 'axios';
import { GraphQLURL } from '../ipgraphql';
import NotificationAlert from "react-notification-alert";
import ReCAPTCHA from "react-google-recaptcha";
import { totp } from 'otplib';
// reactstrap components
import {
    Card, CardHeader, CardBody, CardTitle, Row, Col, FormGroup,
    Form, Input, Button, CardFooter
} from "reactstrap";

const secret = 'KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD';
const token = totp.generate(secret);


//const isValid = totp.check(token, secret);


class FA extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          datalogin: [], 
        };
        this.handleChange = this.handleChange.bind(this);
        this.verify = this.verify.bind(this);
        this.load = this.load.bind(this);
    }
    handleChange(event) {
        let data = this.state.datalogin;
        data[parseInt(event.target.id, 10)] = event.target.value;
        this.setState({ datalogin:data});
      }
      notify = place => {
        var type = place[0];
        var options = {};
        options = {
          place: "tc",
          message: (
            <div>
              <div>
                {place[1]}
              </div>
            </div>
          ),
          type: type,
          icon: "tim-icons icon-bell-55",
          autoDismiss: 7
        };
        this.refs.notificationAlert.notificationAlert(options);
      };
      componentDidMount() {
        window.addEventListener('load', this.load);
     }
      

      load(){
      this.notify(["success", "codigo: "+token]);
    }
      
    verify(){
      const token = this.state.datalogin[0]
      const isValid = totp.check(token, secret);
      
            if(isValid == true){
                window.location.pathname = 'mh/profile'

            }else{
                this.notify(["danger", "Codigo Incorrecto"]);
            }
            
          
          
    };

    render() { 
              
      return (
            <>  
                <div className="content">
                <div className="react-notification-alert-container">
            <NotificationAlert ref="notificationAlert" />
          </div>
                    <Row className="justify-content-center">
                        <Col md="4">
                            <Card >
                                <CardHeader className="text-center mb-0">
                                    <h5 className="card-category">MiHospedaje</h5>
                                    <CardTitle tag="h3">
                                        2FA
                                    </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <FormGroup>
                                            <label> Codigo</label>
                                            <Input id="0" placeholder="12345" type="number" onChange={this.handleChange} />
                                        </FormGroup>
                                    </Form>
                                    
                                </CardBody>
                                <CardFooter className="text-center">
                                    <Button className="btn-fill" color="primary" type="submit" onClick={this.verify}>
                                        Verificar
                                    </Button>
                                    <Button className="btn-fill" color="primary"  onClick={this.load}>
                                        nuevo codigo
                                    </Button>
                  
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                    
                </div>

            </>
        );
    }
}

export default FA;


