import React, { useState, useEffect } from "react";
import { apis as api } from "../../services/api.action";
import { cnt } from "../../services/constant.action";
import { BOM } from "../../services/defined.action";
import { useForm } from "react-hook-form";
import "./movie.css";
import { Header, Movie, Search, Navbar } from "../../components";
import appLabel from "../../config/appLabel";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

const MovieDetail = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { location, history } = props;
  const { state } = location;
  const {
    USER_ID: userId,
    FIRST_NAME: firstName,
    SESSION_ID: token,
  } = userData;

  const [movieDetail, setMovieDetail] = useState({});
  const [movieInputFld, setMovieInputFld] = useState([]);
  const [movieComment, setMovieComment] = useState([]);

  //  const {}=props;
  useEffect(() => {
    // console.log(props);
    if (!state) {
      history.push("/");
      return;
    }
    getListByCriteria(state.ggParam);
    getComment();
  }, []);

  function getListByCriteria(params) {
    // console.log(params);
    setMovieDetail(params);

    setMovieInputFld([
      {
        name: appLabel.name,
        value: params.NAME,
      },
      {
        name: appLabel.releaseDate,
        value: params.RELEASE_DATE,
      },
      // {
      //   name:appLabel.rating,
      //   value:xxxxxx,
      // },
      {
        name: appLabel.ticketPrice,
        value: params.TICKET_PRICE,
      },
      {
        name: appLabel.country,
        value: params.COUNTRY,
      },
      {
        name: appLabel.genre,
        value: params.GENRE,
      },
      {
        name: appLabel.description,
        value: params.DESCRIPTION,
      },
    ]);
  }
  function getComment() {
    // BOM.LoadAlert(cnt.LOAD, "Processing");

    const body = {
      token,
    };

    BOM.FetchReqAction(body, api.GetComment, (err, res) => {
      if (err) {
        BOM.AlertMsg(cnt.DANGER, err);
      } else {
        const objList = res.commentListing;

        const filtered = objList.filter((item)=>item.MOVIE_ID === state.ggParam.MOVIE_ID)
        setMovieComment(filtered);
      }
    });
  }

  const formSubmit = (formValues) => {
    let body = {
      userId,
      movieId: state.ggParam.MOVIE_ID,
      token,
      ...formValues,
    };

    // console.log(body);
    // return;
    BOM.LoadAlert(cnt.LOAD, "Processing");

    BOM.FetchReqAcWithReload(body, api.CreateComment, (err, res) => {
      if (err) {
        BOM.AlertMsg(cnt.DANGER, err);
      } else {
        // setModal(false)
      }
    });
  };

  return (
    <>
      <div className="gradient__bg">
        <Navbar />
      </div>

      <div className="movie-detail-body">
        <div className="container mt-5 mb-5">
          <div className="d-flex justify-content-center row">
            <div className="d-flex flex-column col-md-8">
              <div className="d-flex flex-row align-items-center text-left comment-top p-2 bg-white border-bottom px-4">
                <div className="profile-image">
                  <img
                    className="img-thumbnail"
                    src={
                      movieDetail.PHOTO
                        ? movieDetail.PHOTO
                        : DEFAULT_PLACEHOLDER_IMAGE
                    }
                    width={200}
                  />
                </div>
                <div style={{ paddingLeft: "10px" }}>
                  {movieInputFld.map((item, index) => (
                    <div key={index} className="d-flex flex-row post-title">
                      <h6>{item.name} :</h6>
                      &nbsp;
                      <span className="ml-2">{item.value}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: "20px" }}>
                    <span className="mr-2 comments">13 comments&nbsp;</span>
                    <span className="mr-2 dot" />
                    {/* <span>6 hours ago</span> */}
                  </div>
                </div>
              </div>
              <div className="coment-bottom bg-white p-2 px-4">
                <div className="d-flex flex-row add-comment-section mt-4 mb-4">
                  <img
                    className="img-fluid img-responsive rounded-circle "
                    style={{ marginRight: "10px" }}
                    src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    width={38}
                  />
                  <input
                    type="text"
                    className="form-control mr-3"
                    placeholder="Add comment"
                    style={{ marginRight: "10px" }}
                    {...register("comment", {
                      required: appLabel.fieldReq,
                    })}
                  />

                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleSubmit(formSubmit)}
                  >
                    {appLabel.submitBtn}
                  </button>
                </div>
                <span className="asterisks">{errors?.comment?.message}</span>

                {movieComment.map((item, index) => (
                  <div className="commented-section mt-4" key={index}>
                    <div className="d-flex flex-row align-items-center commented-user">
                      <img
                        className="img-fluid img-responsive rounded-circle "
                        style={{ marginRight: "10px" }}
                        src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        width={28}
                      />
                      <h6 className="mr-2">{item.FIRSTNAME}&nbsp;{item.FIRSTNAME}</h6>
                      {/* <span className="fa fa-dot-circle" /> */}
                      {/* <span className="mb-1 ml-2"> &nbsp; 4 hours ago</span> */}
                    </div>
                    <div
                      className="comment-text-sm"
                      style={{ paddingLeft: "40px" }}
                    >
                      <span style={{ fontSize: "14px" }}>
                        {item.USER_COMMENTS}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const userData = BOM.GetItem("userData") ? BOM.GetItem("userData") : {};
export default MovieDetail;
