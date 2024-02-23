import React,{useCallback, useEffect, useRef, useState} from 'react'
import ReactQuill, {Quill}from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageUploader from "quill-image-uploader";
import {ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage'
import 'quill-image-uploader/dist/quill.imageUploader.min.css';
import { storage } from '../../utils/Firebase';
import {Modal,Spinner} from 'flowbite-react'

const TextEditor = ({form,setForm}) => {
  const [imageUrl, setImageUrl] = useState('')

  const [modal,setModal] = useState(false)


  const ReactQuillRef = useRef(null);

function uploadImage(file) {
setModal(true)

    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      },
      (error) => {
setModal(false)
// dispatch(signUpFailure(error.message))
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
setImageUrl(downloadUrl)
setModal(false)


          // dispatch(signupCreated())
        });
      }
    );
  }

  const imageHandler = useCallback(async () =>{
    const input = document.createElement('input');
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*")
    input.click();

    input.onchange = async () =>{
      if(input !==null && input.files !==null){
        const file = input.files[0];
        const url = uploadImage(file)
        

       
      }
    }

  

  },[])

  useEffect(() =>{
    const quill = ReactQuillRef.current;

    if(quill){
      const range = quill.getEditorSelection();
      range && quill.getEditor().insertEmbed(range.index, "image", imageUrl)
    }
  },[imageUrl])
  

  function handelTitle(e){
    setForm({...form, title:e.target.value})

    let slug = e.target.value;
    slug = slug.trim();
    const words = slug.split(/\s+/);
    slug = words
    .map(word => word.replace(/^[-_]|[-_]$/g, ""))
    .join("-");

    const cleanSlug = slug.replace(new RegExp('@', "g"), "").toLowerCase();
    setForm({...form, slug:cleanSlug})

  }
  


  return (
    <div className='flex-1 flex flex-col gap-8'>
      <div>
        <input value={form?.title} onChange={handelTitle}  placeholder='Title here...' className='border-b-2 focus:border-gray-500 border-transparent w-full px-2 py-3 md:text-3xl text-xl font-semibold  resize-none outline-none focus:border-b-2  bg-transparent  '/>
      </div>
      <ReactQuill  
      onChange={(value) => setForm({...form, content:value})}

      ref={ReactQuillRef}
      theme="snow"
      placeholder="Content...."
      modules={{
        toolbar: {
          container: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["link", "image"],
            ["code-block"],
            ["clean"],
          ],
          handlers: {
            image: imageHandler,
          },
        },
        clipboard: {
          matchVisual: false,
        },
      }}
      formats={[
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "video",
        "code-block",
      ]}

      value={form?.content}
     
    

       className='h-[100vh]' />;

       <Modal onClose={() => setModal(false) } show={modal} size={'sm'} className='grid place-content-center' >

        <Spinner size={'xl'} />
       </Modal>


    </div>
  )
}

export default TextEditor