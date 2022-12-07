import React, { useState } from "react";
import { apis as api } from "../../services/api.action";
import { cnt } from "../../services/constant.action";
import { BOM } from "../../services/defined.action";
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
import { useForm } from "react-hook-form";
import appLabel from "../../config/appLabel";
import history from '../../history'

export const SignIn = (props)=> {
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

    BOM.FetchReqAction(body, api.AuthenticateUser, (err, res) => {
      if (err) {
        // BOM.AlertMsg(cnt.DANGER, err);
        BOM.NotifyMsg(cnt.DANGER, err);
      } else {
          BOM.SetItem('userData', JSON.stringify(res.loginDetail));
          setModal(false)
          BOM.ReloadComponent()
      }
    });
  };
  return (
    <div>
      <p onClick={toggle}>{appLabel.signInBtn}</p>
      <Modal
        size="md"
        isOpen={modal}
        toggle={toggle}
        external={externalCloseBtn}
      >
        <ModalHeader>{appLabel.signInBtn}</ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label>{appLabel.username}</Label>
                  <input
                    placeholder={appLabel.username}
                    type="text"
                    className="form-control"
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
                    className="form-control"
                    type="password"
                    {...register("password", {
                      required: appLabel.fieldReq,
                    })}
                  />
                  <span className="asterisks">{errors?.password?.message}</span>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit(formSubmit)}>
            {appLabel.signInBtn}
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default SignIn