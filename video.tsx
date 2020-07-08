import React, { useState } from "react";
import { IVideoState } from "../types/videoTypes";
import { IMainState } from "../../auth/types/LoginType";
import Header from "../components/Header";
import { History } from "history";
import bgImage from "../../assets/logo1.png";
import Picker from "emoji-picker-react";
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import './selfi.css';
import template from '../../assets/template.png';
import Peer from "peerjs";
interface IProps {
  videoState: IVideoState;
  loginState: IMainState;
  history: History;
  updateComments: (msg: any, name: string) => void;
  toastNotify: (msg: string, success: boolean) => void;
  getInititialDate: () => void;
}
interface IState {
  peer: any;
  message: string;
  videoLoading: boolean;
  chosenEmoji: any;
  pickerEmoji: boolean;
}
const [dataUri, setDataUri] = useState('');
class Video extends React.Component<IProps, IState> {
  state: IState = {
    peer: "",
    message: "",
    videoLoading: false,
    chosenEmoji: "",
    pickerEmoji: false,
  };
  // function handleTakePhoto (dataUri) {
  //   console.log('takePhoto');
  // };
  // function myFunction() {
  //   var x = document.getElementById("demo");
  //     x.style.display = "block";
  //    };
  //selfi ends
  componentDidMount() {
    this.props.getInititialDate();
    const peer = new Peer(this.props.loginState.fullName, {
      host: "localhost",
      port: 9000,
      path: "/",
    });
    const peer2 = new Peer("another-peers-id", {
      host: "localhost",
      port: 9000,
      path: "/",
    });
    this.setState({ peer });

    peer2.on("connection", (conn) => {
      conn.on("data", (data) => {
        this.props.updateComments(data, this.props.loginState.fullName);
      });
    });

    setTimeout(() => this.setState({ videoLoading: true }), 4000);
    (function (d: any, w: any, c: any) {
      w.ChatraID = "hG7t4GAk7GZpMjZrN";
      var s = d.createElement("script");
      w[c] =
        w[c] ||
        function () {
          (w[c].q = w[c].q || []).push(arguments);
        };
      s.async = true;
      s.src = "https://call.chatra.io/chatra.js";
      if (d.head) d.head.appendChild(s);
    })(document, window, "Chatra");
  }

  sendMessage = () => {
    if (this.state.message !== "") {
      const conn = this.state.peer.connect("another-peers-id");
      conn.on("open", () => {
        console.log(this.state.message, "---------------------");
        conn.send(this.state.message);
        this.setState({ message: "" });
      });
    }
  };

  render() {
    const onEmojiClick = (event: any, emojiObject: any) => {
      console.log(emojiObject);

      this.setState({ pickerEmoji: false, message: emojiObject.emoji });
    };
    return (
      <>
        <Header
          history={this.props.history}
          toast={(msg: string, success: boolean) =>
            this.props.toastNotify(msg, success)
          }
          name={this.props.loginState.fullName}
        />

        <div className="container-fuild bg-image">
          <div className="row mt-5 align-items-center d-flex justify-content-center">
            {this.state.pickerEmoji && (
              <div style={{ position: "absolute", right: 0, zIndex: 1 }}>
                <Picker onEmojiClick={onEmojiClick} />
              </div>
            )}
            <div className="col-md-8 col-sm-12 align-items-center d-flex justify-content-center ">
              <div className="col-md-12 col-sm-12  ">
                <div className="vh-75">
                  <iframe
                    className="col-md-12 noHover video-height"
                    style={{ border: "none" }}
                    src="https://www.youtube.com/embed/4oSO0buOw8E?controls=0&autoplay=0&rel=0&modestbranding=0&showinfo=0&iv_load_policy=3&modestbranding=1&nologo=1"

                    //src="https://www.youtube.com/embed/live_stream?channel=12345"
                    //src="https://www.youtube.com/embed/96kI8Mp1uOU?controls=1&autoplay=0&modestbranding=1"
                  ></iframe>
                </div>
                {/* <div className="row mt-4 d-flex justify-content-center ">
                  <div className="col-md-5 bg-white border border-secondary p-2 mr-1 d-flex justify-content-center  ">
                    <img
                      // style={{ height: "55px", width: "55px", padding: "10px" }}
                      src={LogoOne}
                    />
                  </div>
                  <div className="col-md-5 bg-white border border-secondary p-2 mr-1 d-flex justify-content-center  ">
                    <img
                      // style={{ height: "55px", width: "55px" }}
                      src={LogoTwo}
                    />
                  </div>
                </div> */}
              </div>
              <div className="col-md-5 col-sm-8 ">
                <div className="col-md-12 pb-3 video-height shadow rounded bg-light">
                  <div
                    className="d-flex justify-content-center mt-3 mb-3"
                    style={{
                      fontWeight: "bolder",
                      fontSize: "20px",
                    }}
                  >
                    Share your thoughts!
                  </div>
                  <div className="mt-2 mb-2 " style={{ height: "300px" }}>
                    {console.log(this.props.videoState.comments)}
                    {this.props.videoState.comments.map((value) => (
                      <div>
                        <div
                          style={{ fontWeight: "bolder" }}
                          className="d-flex justify-content-end pr-3"
                        >
                          {value.name}
                        </div>
                        <div className="d-flex justify-content-end pr-3">
                          {"\n"}
                          {value.msg}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    className="row d-flex mt-5 justify-content-center"
                    style={{
                      position: "absolute",
                      bottom: 10,
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <input
                      className="btn rounded-pill col-md-8 col-sm-6 mr-2 border border-secondary text-dark"
                      placeholder="Comments here"
                      value={this.state.message}
                      onChange={(e) =>
                        this.setState({ message: e.target.value })
                      }
                    />
                    <a
                      onClick={() =>
                        this.setState({
                          pickerEmoji: !this.state.pickerEmoji,
                        })
                      }
                      className="primary-color-bg p-2 mr-2 rounded-circle"
                    >
                      <i className="fas text-white fa-smile  p-2"></i>
                    </a>
                    <a
                      onClick={() => this.sendMessage()}
                      className="primary-color-bg p-2 rounded-circle"
                    >
                      <i className="fas text-white fa-paper-plane  p-2"></i>
                    </a>
                  </div>
                  {/* <div className="row d-flex justify-content-center ">
                  <div className="col-sm-12">
                    <div className="row">
                    <input
                      className="btn rounded-pill border border-secondary mr-2 col-md-9 col-sm-9 d-flex justify-content-start text-white"
                      placeholder="Comments here"
                    />
                    <a className="primary-color-bg p-2 rounded-circle">
                      <i
                        style={{
                          height: "30px",
                        }}
                        className="fas text-white fa-paper-plane p-2"
                      ></i>
                    </a>
                    </div>
                  </div>
                </div> */}
                </div>
              </div>
            </div>
          </div>
          {/* Here comes selfi room */}
          <div>
      {
        <Camera
          onTakePhoto = { (dataUri: any) => {function myFunction() {
            var x = document.getElementById("demo");
              x.style.display = "block";
             }function handleTakePhoto (dataUri: any) {
              console.log('takePhoto');
            };myFunction(),handleTakePhoto(dataUri); } }
              idealFacingMode = {FACING_MODES.ENVIRONMENT}
      idealResolution = {{width: 640, height: 480}}
      imageType = {IMAGE_TYPES.PNG}
      imageCompression = {0.97}
      isMaxResolution = {true}
      isImageMirror = {false}
      isSilentMode = {false}
      isDisplayStartCameraError = {true}
      isFullscreen = {false}
      sizeFactor = {1}
                />
      }
    </div>
          {/* <div className="row mt-5">
            <div
              className="col-md-12"
              style={{ backgroundColor: "black" }}
            ></div>
          </div> */}
          {/* Selfi room end */}
          <div className="row mt-5">
            <div
              className="col-md-12 d-flex justify-content-center mb-3"
              style={{ backgroundColor: "#F0C62D", padding: "50px" }}
            >
              <div>
                <h1 className="text-black mt-3 mb-5">Image Gallery</h1>
                <div
                  id="carouselExampleControls"
                  className="carousel slide col-md-12 p-2"
                  data-ride="carousel"
                >
                  <div className="entireframe" id="demo" >
                  <img src={template} className="mainframe"/>
                  <img src={dataUri} className="innerimg"/>
                  </div>

                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img src={bgImage} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                      <img src={bgImage} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                      <img src={bgImage} className="d-block w-100" alt="..." />
                    </div>
                  </div>
                  <a
                    className="carousel-control-prev"
                    href="#carouselExampleControls"
                    role="button"
                    data-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Previous</span>
                  </a>
                  <a
                    className="carousel-control-next"
                    href="#carouselExampleControls"
                    role="button"
                    data-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Next</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Video;
