import React, { Component } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

class CropperPhoto extends Component {
  cropper = React.createRef(null);

  cropImage = () => {
    const { setImage } = this.props;
    if (typeof this.cropper.current.getCroppedCanvas() === "undefined") {
      console.log(
        "CropImgae Undefined",
        this.cropper.current.getCroppedCanvas()
      );
      return;
    }

    this.cropper.current.getCroppedCanvas().toBlob((blob) => {
      setImage(blob);
    }, "image/jpeg");
  };

  render() {
    const { imagePreview } = this.props;
    return (
      <Cropper
        ref={this.cropper}
        src={imagePreview}
        style={{ height: 200, width: "100%" }}
        preview=".img-preview" //! will provide preview as class Style
        aspectRatio={16 / 9}
        viewMode={2}
        dragMode="move"
        scalable={true}
        cropBoxMovable={true}
        cropBoxResizable={true}
        guides={false}
        crop={this.cropImage}
      />
    );
  }
}

export default CropperPhoto;
