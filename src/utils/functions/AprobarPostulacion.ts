import axios from 'axios';
import config from '../urls.ts';
import { toast } from 'react-hot-toast';

const api = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: config.apiUrl,
})

export  const handlePostulacion = async (numdoc,nompernatural,apellidoPart,apellidoMart,
                                         razonsocial, correoRegis, ruc, condicion ) => {

  try {
    let postulacionBody;
    console.log("entre al try esots son los valores: " + nompernatural, apellidoPart,correoRegis);
    switch (condicion){
      case 1:
        postulacionBody = {
          ruc: ruc,
          email: correoRegis,
          numdoc: numdoc,
          nombre: nompernatural,
          apellidoPart: apellidoPart,
          apellidoMart: apellidoMart,
          condicion : condicion,
          razonSocial: razonsocial
        }
        break;
      case 2:
        postulacionBody = {
          email: correoRegis,
          condicion : condicion,
          razonSocial: razonsocial
        }
    }

    console.log(postulacionBody);
    const response = await api.put("/Update/EstadoPostulacion/", {
      postulacionBody
    });
    if (response.status === 400){
      toast.error('Surgio un error.')
      return;
    }
    console.log(postulacionBody);
    console.log(response.data)
    let usuarioSelti = response.data.usuario;
    let correo = response.data.correo

    if(response.status === 200){
      console.log("aqui esta la condicion" + condicion);

      let emailBody;

      switch (condicion) {
        case 1:
          emailBody = {
            ruc: ruc,
            razonSocial: razonsocial,
            usuario: usuarioSelti,
            correo: correo,
            condicion: condicion,
          }
          break;
        case 2:
          emailBody = {
            ruc: ruc,
            razonSocial: razonsocial,
            usuario: usuarioSelti,
            correo: correo,
            condicion: condicion,
          }
          break;
        default:
          toast.error("Surgio un error.");
      }

      // await api.post("/Send/postulacionEmails/",{
      //   emailBody
      // })

    }else{
      toast.error("Surgio un error.")
    }
  } catch (error) {
    console.log(error.response.data.error);
  }
};
