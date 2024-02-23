import React, { useState, useRef } from "react";
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";

import { useNavigate,Link } from "react-router-dom";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import { storage } from "../../utils/Firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const TextEditorSidebar = ({ form, setForm }) => {
  const [tempImage, setTempImage] = useState({});
  const [imageuploadProgress, setImageUploadProgress] = useState("");
  const imageRef = useRef();

  function handelTags(e) {
    const tags = e.target.value;
    const tagsArray = tags.split(",");
    const removeWhiteSpace = tagsArray.map((tag) => tag.trim(0));
    setForm({ ...form, tags: removeWhiteSpace });
  }

  function handelImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setTempImage({ url: URL.createObjectURL(file), file });
    }
  }

  function uploadImage() {
    if (!tempImage.file) {
      return;
    }
    // dispatch(signUpStart())

    const fileName = new Date().getTime() + tempImage.file.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, tempImage.file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProgress(progress.toFixed(0));
      },
      (error) => {
        // dispatch(signUpFailure(error.message))
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setForm({ ...form, featuredImage: downloadUrl });
          setImageUploadProgress(null);
          // dispatch(signupCreated())
        });
      }
    );
  }

 
  
  return (
    <div className=" md:w-[300px] flex flex-col gap-12 my-4 ">
      <div className="dark:bg-gray-700 bg-gray-100/[0.8] py-3 px-5 rounded-lg flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Publish Article</h3>
        <div className="flex gap-2">
          <Button outline className="w-15  text-xs">
            Save Draft
          </Button>
          <Button className="w-15  text-xs">Publish</Button>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="slug">Slug</Label>
          <TextInput
            onChange={(e) => setForm({...form, slug:e.target.value})}
            value={form?.slug && form.slug}
            id="slug"
            name="slug"
          />
        </div>
        <Link to={'/write?draft=preview'}>Preview here </Link>
      </div>
      {/* featured image */}
      <div className="flex flex-col gap-3 dark:bg-gray-700 bg-gray-100/[0.8] py-3 px-5 rounded-lg ">
        <h3 className="text-lg font-semibold">Featured Image</h3>
        <div
          onClick={() => imageRef.current.click()}
          className="dark:bg-gray-500 bg-gray-300 overflow-hidden cursor-pointer   h-[120px] mx-auto w-[250px] grid place-content-center relative"
        >
          <input
            type="file"
            accept="image/*"
            ref={imageRef}
            onChange={handelImageChange}
            className="hidden"
          />
          {imageuploadProgress && (
            <CircularProgressbar
              value={imageuploadProgress || 0}
              strokeWidth={3}
              text={`${imageuploadProgress}%`}
              styles={{
                root: {
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  width: "100px",
                  height: "100px",
                  position: "absolute",
                  color: "red",
                },
                path: {
                  stroke: `rgba(183,244,216, ${imageuploadProgress / 100})`,
                },
              }}
            />
          )}

          <div className="">
            {form?.featuredImage ? (
              <img
                className=" object-contain w-full h-full"
                src={form.featuredImage}
              />
            ) : tempImage.url ? (
              <img
                className="h-full object-contain w-full"
                src={tempImage.url}
              />
            ) : (
              <p>Upload Image</p>
            )}
          </div>

          {/* img */}
        </div>

        <Button onClick={uploadImage}>Upload</Button>
      </div>
      {/* /OHTER */}
      <div className="flex flex-col gap-4 dark:bg-gray-700 bg-gray-100/[0.8] py-3 px-5 rounded-lg ">
        {/* category */}
        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            onChange={(e) => setForm({ ...form, category: e.traget.value })}
          >
            <option value={"nextjs"}>Next js</option>
          </Select>
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="tags">Tags</Label>
          <TextInput name="tags" id="tags" onChange={handelTags} />
          <span>Seperate by commas if multiple tags</span>
        </div>
      </div>
    </div>
  );
};

export default TextEditorSidebar;
