import React, { useState } from "react";
import { apis as api } from "../../services/api.action";
import { cnt } from "../../services/constant.action";
import { BOM } from "../../services/defined.action";
import { useForm } from "react-hook-form";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import appLabel from "../../config/appLabel";
import history from '../../history'

export function SignUp(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const externalCloseBtn = (
    <button
      type="button"
      className="close"
      style={{ position: "absolute", top: "15px", right: "15px" }}
      onClick={toggle}
    >
      &times;
    </button>
  );

  const formSubmit = (formValues) => {
    let body = {
      ...formValues,
    };

    // console.log(body);
    // return;
    BOM.LoadAlert(cnt.LOAD, "Processing");

    BOM.FetchReqAction(body, api.CreateUser, (err, res) => {
      if (err) {
        BOM.AlertMsg(cnt.DANGER, err);
      } else {
        BOM.NotifyMsg(cnt.SUCCESS, res.message);
        setModal(false)
        BOM.ReloadComponent()
      }
    });
  };
  return (
    <div>
      <button type="button" onClick={toggle}>
        Sign up
      </button>
      <Modal
        size="md"
        isOpen={modal}
        toggle={toggle}
        external={externalCloseBtn}
      >
        <ModalHeader>{appLabel.signUp}</ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label>{appLabel.username}</Label>
                  <input
                    placeholder={appLabel.username}
                    className="form-control mr-3"
                    type="text"
                    {...register("userName", {
                      required: appLabel.fieldReq,
                    })}
                  />
                 
                  <span className="asterisks">{errors?.userName?.message}</span>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>{appLabel.password}</Label>
                  <input
                    placeholder={appLabel.password}
                    className="form-control mr-3"
                    type="password"
                    {...register("password", {
                      required: appLabel.fieldReq,
                    })}
                  />
                 
                  <span className="asterisks">{errors?.password?.message}</span>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>{appLabel.firstName}</Label>
                  <input
                    placeholder={appLabel.firstName}
                    className="form-control mr-3"
                    type="text"
                    {...register("firstName", {
                      required: appLabel.fieldReq,
                    })}
                  />
                 
                  <span className="asterisks">
                    {errors?.firstName?.message}
                  </span>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>{appLabel.lastName}</Label>
                  <input
                    placeholder={appLabel.lastName}
                    className="form-control mr-3"
                    type="text"
                    {...register("lastName", {
                      required: appLabel.fieldReq,
                    })}
                  />
                 
                  <span className="asterisks">{errors?.lastName?.message}</span>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>{appLabel.country}</Label>
                  <input
                    placeholder={appLabel.country}
                    className="form-control mr-3"
                    type="text"
                    {...register("country", {
                      required: appLabel.fieldReq,
                    })}
                  />
                 
                  <span className="asterisks">{errors?.country?.message}</span>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>{appLabel.address}</Label>
                  <input
                    placeholder={appLabel.address}
                    className="form-control mr-3"
                    type="text"
                    {...register("address", {
                      required: appLabel.fieldReq,
                    })}
                  />
                 
                  <span className="asterisks">{errors?.address?.message}</span>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>{appLabel.email}</Label>
                  <br/>
                  <input
                    placeholder={appLabel.email}
                    className="form-control mr-3"
                    type="text"
                    {...register("email", {
                      required: appLabel.fieldReq,
                    })}
                  />
                 
                  <span className="asterisks">{errors?.email?.message}</span>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit(formSubmit)}>
            {appLabel.signUpBtn}
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default SignUp
