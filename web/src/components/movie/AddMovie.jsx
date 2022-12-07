import React, { useState } from "react";

import { apis as api } from "../../services/api.action";
import { cnt } from "../../services/constant.action";
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
import { BOM } from "../../services/defined.action";
import appStatic from "../../config/appStaticData";
function AddMovie(props) {

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const {genreData}=appStatic
    const { SESSION_ID:token } = userData;
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
        token
      };
  
      // console.log(body);
      // return;
      BOM.LoadAlert(cnt.LOAD, "Processing");

    BOM.FetchReqAcWithReload(body, api.CreateMovie, (err, res) => {
      if (err) {
        BOM.AlertMsg(cnt.DANGER, err);
      } else {
          setModal(false)
      }
    });

    
    };
    return (
      <div>
        <Button color="primary" onClick={toggle}>
          Add a New Movie
        </Button>
        <Modal
          size="lg"
          isOpen={modal}
          toggle={toggle}
          external={externalCloseBtn}
        >
          <ModalHeader>New Movie</ModalHeader>
          <ModalBody>
            <Form>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label >{appLabel.name}</Label>
                    <input
                      placeholder={appLabel.name}
                      type="text"
                       className="form-control"
                      {...register("name", {
                        required: appLabel.fieldReq,
                      })}
                    />
                   
                    <span className="asterisks">{errors?.name?.message}</span>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label >{appLabel.description}</Label>
                    <input
                      placeholder={appLabel.description}
                      type="text"
                       className="form-control"
                      {...register("description", {
                        required: appLabel.fieldReq,
                      })}
                    />
                   
                    <span className="asterisks">
                      {errors?.description?.message}
                    </span>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label >{appLabel.releaseDate}</Label>
                    <input
                      placeholder={appLabel.releaseDate}
                      type="date"
                      max={BOM.ReformatDate(new Date())}
                       className="form-control"
                      {...register("releaseDate", {
                        required: appLabel.fieldReq,
                      })}
                    />
                   
                    <span className="asterisks">
                      {errors?.releaseDate?.message}
                    </span>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label >{appLabel.rating}</Label>
                    <input
                      placeholder={appLabel.rating}
                      type="text"
                       className="form-control"
                      {...register("rating", {
                        required: appLabel.fieldReq,
                      })}
                    />
                   
                    <span className="asterisks">{errors?.rating?.message}</span>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label >{appLabel.ticketPrice}</Label>
                    <input
                      placeholder={appLabel.ticketPrice}
                      type="text"
                       className="form-control"
                      {...register("ticketPrice", {
                        required: appLabel.fieldReq,
                        // valueAsNumber: true,
                      })}
                    />
                   
                    <span className="asterisks">
                      {errors?.ticketPrice?.message}
                    </span>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label >{appLabel.country}</Label>
                    <input
                      placeholder={appLabel.country}
                      type="text"
                       className="form-control"
                      {...register("country", {
                        required: appLabel.fieldReq,
                      })}
                    />
                   
                    <span className="asterisks">{errors?.country?.message}</span>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label >{appLabel.genre}</Label>
                    {/* <input
                      placeholder={appLabel.genre}
                      type="text"
                       className="form-control"
                      {...register("genre", {
                        required: appLabel.fieldReq,
                      })}
                    /> */}

                    <select className="form-control" {...register("genre", {
                        required: appLabel.fieldReq,
                      })}>
                        <option value=''>{appLabel.select}</option>
                      {
                        genreData.map((item, index)=>(
                            <option key={index} value={item.value}>{item.value}</option>
                        ))
                      }
                    </select>
                   
                    <span className="asterisks">{errors?.genre?.message}</span>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label >{appLabel.photo}</Label>
                    (<small>&nbsp;Please provide an image link</small>)
                    <input
                      placeholder={appLabel.photo}
                      type="text"
                       className="form-control"
                      {...register("photo", {
                        required: appLabel.fieldReq,
                      })}
                    />
                   
                    <span className="asterisks">{errors?.photo?.message}</span>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleSubmit(formSubmit)}>
              Save
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  const userData = BOM.GetItem("userData") ? BOM.GetItem("userData") : {};

  export default AddMovie 