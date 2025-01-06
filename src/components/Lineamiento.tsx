import InputFile from './InputFile.tsx';
import Input from './Input.tsx';
import React, { useContext, useEffect, useState } from 'react';
import Buttons from './Buttons.tsx';
import { IoDocumentTextSharp } from "react-icons/io5";
import Swal from 'sweetalert2';
import { toast, Toaster } from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext.tsx';
import config from '../utils/urls.ts';
import axios from 'axios';

type Props = {
  lineamiento: string;
  estandar: string;
  contenidoLinea: string;
  contenidoEstan: string;
  filesNumber?: (data: number) => void;
};

type FileRecord = {
  [key: string]: File;
};

const Lineamiento = ({ contenidoLinea, contenidoEstan }: Props) => {

  const api = axios.create({
    baseURL: config.apiUrl
  })
  const {authData} = useContext(AuthContext)
  const rucUsuario:string = authData?.rucUsuario


  const [files, setFiles] = useState<FileRecord>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const fileInput = e.target.files?.[0];
    console.log(`Archivo cargado en índice ${index}:`, fileInput);

    if (fileInput) {
      setFiles((prevState) => ({
        ...prevState,
        [`file${index}`]: fileInput,
      }));
    }
  };

  console.log(files.file1); // Primer archivo
  console.log(files.file2); // Segundo archivo
  console.log(files.file3); // Tercer archivo

  const handleDocs = async()=>{
    const formData = new FormData();

    for (let [key, file] of Object.entries(files)){
      formData.append(key, file);
    }
    formData.append('ruc', rucUsuario);

      await api.post(
      '/files/UploadLineamientos/',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },

      }
    );
  }

  const handleSendDocs =  () =>{

    if (Object.keys(files).length === 9) {
      Swal.fire({
        title: 'Confirmación',
        html: '¿Estás seguro de <b>ENVIAR</b> los documentos?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Atrás',
      }).then((result) => {
        if (result.isConfirmed) {
          handleDocs();
          toast.success('Los documentos se enviaron correctamente.');
        }
      });
    } else {
      toast.error('Debe cargar todo los documentos.', {
        style: { background: '#333', color: '#fff' },
      });
    }

  }

  const hasFile = (fileIndex: number):boolean =>{
    return Boolean(files[`file${fileIndex}`])
  }

  return (
    <section>
      <Toaster />
      <article className="mb-4">
        <p className="text-xl">Lineamiento 1:</p>
        <p className="text-gray-600">{contenidoLinea}</p>
        <div className="ml-8">
          <p className="text-xl">Estándar 1:</p>
          <div className="text-gray-600 mb-4">{contenidoEstan}</div>
          <InputFile
            isLabel={hasFile(1)}
            onChange={(e) => handleChange(e, 1)} className="mb-4" />
          <Input disabled label="Comentarios" />
        </div>
      </article>
      <article className="mb-4">
        <p className="text-xl">Lineamiento 2:</p>
        <p className="text-gray-600">{contenidoLinea}</p>
        <div className="ml-8">
          <p className="text-xl">Estándar 2.1:</p>
          <div className="text-gray-600 mb-4">{contenidoEstan}</div>
          <InputFile
            isLabel={hasFile(2)}
            onChange={(e) => handleChange(e, 2)} className="mb-4" />
          <Input disabled label="Comentarios" />
        </div>
        <div className="ml-8">
          <p className="text-xl">Estándar 2.2:</p>
          <div className="text-gray-600 mb-4">{contenidoEstan}</div>
          <InputFile
            isLabel={hasFile(3)}
            onChange={(e) => handleChange(e, 3)}
            className="mb-4" />
          <Input disabled label="Comentarios" />
        </div>
        <div className="ml-8">
          <p className="text-xl">Estándar 2.3:</p>
          <div className="text-gray-600 mb-4">{contenidoEstan}</div>
          <InputFile
            isLabel={hasFile(4)}
            onChange={(e) => handleChange(e, 4)}
            className="mb-4" />
          <Input disabled label="Comentarios" />
        </div>
        <div className="ml-8">
          <p className="text-xl">Estándar 2.4:</p>
          <div className="text-gray-600 mb-4">{contenidoEstan}</div>
          <InputFile
            isLabel={hasFile(5)}
            onChange={(e) => handleChange(e, 5)} className="mb-4" />
          <Input disabled label="Comentarios" />
        </div>
      </article>
      <article className="mb-4">
        <p className="text-xl">Lineamiento 3:</p>
        <p className="text-gray-600">{contenidoLinea}</p>
        <div className="ml-8">
          <p className="text-xl">Estándar 3.1:</p>
          <div className="text-gray-600 mb-4">{contenidoEstan}</div>
          <InputFile
            isLabel={hasFile(6)}
            onChange={(e) => handleChange(e, 6)} className="mb-4" />
          <Input disabled label="Comentarios" />
        </div>
        <div className="ml-8">
          <p className="text-xl">Estándar 3.2:</p>
          <div className="text-gray-600 mb-4">{contenidoEstan}</div>
          <InputFile
            isLabel={hasFile(7)}
            onChange={(e) => handleChange(e, 7)} className="mb-4" />
          <Input disabled label="Comentarios" />
        </div>
      </article>
      <article className="mb-4">
        <p className="text-xl">Lineamiento 4:</p>
        <p className="text-gray-600">{contenidoLinea}</p>
        <div className="ml-8">
          <p className="text-xl">Estándar 4.1:</p>
          <div className="text-gray-600 mb-4">{contenidoEstan}</div>
          <InputFile
            isLabel={files?.file8 ? true : false}
            onChange={(e) => handleChange(e, 8)} className="mb-4" />
          <Input disabled label="Comentarios" />
        </div>
      </article>
      <article className="mb-8">
        <p className="text-xl">Lineamiento 5:</p>
        <p className="text-gray-600">{contenidoLinea}</p>
        <div className="ml-8">
          <p className="text-xl">Estándar 5.1:</p>
          <div className="text-gray-600 mb-4">{contenidoEstan}</div>
          <InputFile
            isLabel={hasFile(9)}
            onChange={(e) => handleChange(e, 9)} className="mb-4" />
          <Input disabled label="Comentarios" />
        </div>
      </article>
      <Buttons
        className="flex items-center ButtonRed"
        onClick={handleSendDocs}
      >
        ENVIAR
          <IoDocumentTextSharp
            className='ml-2 text-xl'
          />
      </Buttons>
    </section>
  );
};

export default Lineamiento;
