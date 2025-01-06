import { useContext, useEffect, useState } from 'react';
import Buttons from '../../components/Buttons.tsx';
import Modal from '../../components/Modal.tsx';
import Input from '../../components/Input.tsx';
import axios from 'axios';
import config from '../../utils/urls.ts';
import Selects from '../../components/Selects.tsx';
import { toast, Toaster } from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext.tsx';
import Tablas from '../../components/Tablas.tsx';

type TransFormedData = {
  label: string;
  value: string;
};

type apiDataState = {
  descripcion: string;
  codigo: string;
  DESPER: string;
  CODPER: string;
};

type FormData = {
  tipodocumento?: number;
  rol?: number;
  numdoc?: string;
  correo?: string;
  codusu?: string;
  razonSocial: string;
  apellidoPaterno?: string;
  apellidos: string;
  ruc?: string;
  usreg?: string;
  numeroRuc: string;
};

const UsuariosInternos = () => {
  const api = axios.create({
    baseURL: config.apiUrl,
  });

  const { authData } = useContext(AuthContext);

  let userReg: string = authData?.usuarioName;

  const [typeDocument, setTypeDocument] = useState<apiDataState[]>([]);
  const [typeRoles, setTypeRoles] = useState<apiDataState[]>([]);

  useEffect(() => {
    const ListType = async () => {
      try {
        const response = await api.get('/apiListar/TipoDocumento/');
        setTypeDocument(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    ListType();
  }, []);

  useEffect(() => {
    const ListTypePerfil = async () => {
      try {
        const response = await api.get('/apiListar/Perfil/');
        setTypeRoles(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    ListTypePerfil();
  }, []);

  const dataTransformed: TransFormedData[] = typeDocument.map((item) => ({
    label: item.descripcion,
    value: item.codigo,
  }));

  const dataTransformedRoles: TransFormedData[] = typeRoles.map((item) => ({
    label: item.DESPER,
    value: item.CODPER,
  }));

  const [isRol, setIsRol] = useState(false);

  const [formData, setFormData] = useState<FormData>({});

  const handleSearchDoc = async (e) => {
    e.preventDefault();

    const { tipodocumento, numdoc } = formData;

    if (tipodocumento === undefined) {
      toast.error('Seleccione un tipo de documento', {
        style: { background: '#333', color: '#fff' },
      });
      return;
    }
    if (numdoc === undefined) {
      toast.error('Ingrese un número de documento', {
        style: { background: '#333', color: '#fff' },
      });
      return;
    }

    try {
      const response = await api.get(
        `/apiConsultas/documentoIdentidad/${tipodocumento}/${numdoc}/`,
      );
      const { apellidoMaterno, apellidoPaterno, nombres } = response.data;

      setFormData({
        ...formData,
        codusu: nombres,
        apellidos: `${apellidoPaterno} ${apellidoMaterno}`,
        apellidoPaterno: apellidoPaterno,
      });
    } catch (error) {
      toast.error(error.response.data.error, {
        style: { background: '#333', color: '#fff' },
      });
    }
  };

  const handleRol = (value: number | string) => {
    if (value === 4) {
      setIsRol(true);
      setFormData({
        ...formData,
        rol: value,
        codusu: '',
        apellidoPaterno: '',
        numdoc: '',
      });
    } else {
      setIsRol(false);
      setFormData({
        ...formData,
        rol: value,
        codusu: '',
        apellidoPaterno: '',
        numdoc: '',
      });
    }
  };

  const handleDoc = (value: number | string) => {
    setFormData({
      ...formData,
      tipodocumento: value,
      codusu: '',
      apellidoPaterno: '',
      numdoc: '',
    });
  };

  const handleSearchRUC = async (e) => {
    e.preventDefault();

    const { numeroRuc } = formData;

    try {
      const response = await api.get(`/apiConsultas/sunat/${numeroRuc}`);
      const { ddp_nombre } = response.data;
      setFormData({
        ...formData,
        razonSocial: ddp_nombre,
      });
    } catch (error) {
      toast.error(error.response.data.error, {
        style: { background: '#333', color: '#fff' },
      });
    }
  };

  const handlCreateUser = async () => {
    const { rol, apellidoPaterno, correo, tipodocumento, codusu, numdoc } =
      formData;

    let rolUsers: string = '';
    let CreateBody: {};

    switch (rol) {
      case 4:
        if (correo === undefined || codusu === undefined) {
          toast.error('Ingrese todo los datos.', {
            style: { background: '#333', color: '#fff' },
          });

          return;
        }
        CreateBody = {
          tipodocumento: 'RUC',
          usuario: formData.numeroRuc,
          nombre: formData.numeroRuc,
          correo: formData.correo,
          rol: 'AUDITOR-EXTERNO',
          usreg: userReg,
        };
        break;
      default:
        if (
          tipodocumento === undefined ||
          numdoc === undefined ||
          correo === undefined ||
          codusu === undefined
        ) {
          toast.error('Ingrese todo los datos.', {
            style: { background: '#333', color: '#fff' },
          });

          return;
        }
        if (rol === 2) {
          rolUsers = 'SECRETARIA-TECNICA';
        } else {
          rolUsers = 'EQUIPO-TECNICO';
        }
        CreateBody = {
          tipodocumento: formData.tipodocumento,
          nombre: formData.codusu,
          correo: formData.correo,
          apellidoPaterno: apellidoPaterno,
          rol: rolUsers,
          usreg: userReg,
        };
    }

    try {
      await api.post('/Create/UsuarioInternoSelti/', { CreateBody });

      setFormData({
        rol: '',
        codusu: '',
        correo: '',
        usuarioRuc: '',
        numdoc: '',
        razonSocial: '',
        apellidoPaterno: '',
        apellidos: '',
        numeroRuc: '',
      });

      toast.success('Usuario creado!');
      console.log('aqui se va el valor de tipo2: ' + formData.tipodocumento);
    } catch (error) {
      // setFormData({
      //   roles: '',
      //   tipodocumento: '',
      //   codusu: '',
      // usuarioRuc: '',
      //   correo: '',
      //   numdoc: '',
      //   razonSocial: '',
      //   ruc: '',
      //   apellidos: '',
      //   apellidoPaterno: '',
      // });
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    document.title = 'Usuarios internos';
  }, []);

  const columns = [
    { header: 'ID', key: 'id' },
    { header: 'Nombre', key: 'name' },
    { header: 'Rol', key: 'role' },
    { header: 'Correo', key: 'email' },
  ];

  const data = [
    {
      id: 1,
      name: 'Juan Pérez',
      role: 'Administrador',
      email: 'juan@example.com',
    },
    { id: 2, name: 'María López', role: 'Usuario', email: 'maria@example.com' },
    {
      id: 3,
      name: 'Carlos García',
      role: 'Editor',
      email: 'carlos@example.com',
    },
    {
      id: 4,
      name: 'Juan Pérez',
      role: 'Administrador',
      email: 'juan@example.com',
    },
    { id: 5, name: 'María López', role: 'Usuario', email: 'maria@example.com' },
    {
      id: 6,
      name: 'Carlos García',
      role: 'Editor',
      email: 'carlos@example.com',
    },
    {
      id: 7,
      name: 'Juan Pérez',
      role: 'Administrador',
      email: 'juan@example.com',
    },
    { id: 8, name: 'María López', role: 'Usuario', email: 'maria@example.com' },
    {
      id: 9,
      name: 'Carlos García',
      role: 'Editor',
      email: 'carlos@example.com',
    },
    {
      id: 10,
      name: 'Carlos García',
      role: 'Editor',
      email: 'carlos@example.com',
    },
    {
      id: 11,
      name: 'Juan Pérez',
      role: 'Administrador',
      email: 'juan@example.com',
    },
    {
      id: 12,
      name: 'María López',
      role: 'Usuario',
      email: 'maria@example.com',
    },
    {
      id: 13,
      name: 'Carlos García',
      role: 'Editor',
      email: 'carlos@example.com',
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="pt-[3rem] ">
      <Toaster />
      <div className="bg-white p-[1rem] mb-[3rem]">
        <div className="flex-between border-b-4 border-red-600 pb-2 mb-8">
          <h2 className="text-3xl">Administración de usuarios</h2>
          <Buttons
            className="text-white py-1 bg-redMain"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Crear usuario
          </Buttons>
        </div>
        <div>
          <Tablas columns={columns} data={data} />
        </div>
        <Modal
          isOpen={isModalOpen}
          textModal={isRol ? 'Crear usuario extero' : 'Crear usuario interno'}
          ClassName="w-[710px]"
          onAccept={handlCreateUser}
          onCancel={() => setIsModalOpen(false)}
          onClose={() => setIsModalOpen(false)}
        >
          <form className="mx-4 mt-4 flex flex-wrap  pb-[1rem]">
            {isRol ? (
              <>
                <div className="w-full bg-white mb-[0.8rem]">
                  <Selects
                    options={dataTransformedRoles}
                    placeholder="Seleccione tipo de usuario"
                    labelP="Tipo de usuarios"
                    onChange={handleRol}
                    classNameDiv="w-[230px]"
                  />
                </div>
                <div className=" w-full">
                  <div className="w-full flex ">
                    <Input
                      label="Número de RUC"
                      value={formData.numeroRuc}
                      className="w-[200px]"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          numeroRuc: e.target.value,
                        });
                      }}
                    />
                    <Buttons
                      className="bg-redMain text-white h-[31.6px] self-end"
                      onClick={handleSearchRUC}
                    >
                      Buscar
                    </Buttons>
                  </div>
                  <div className="flex">
                    <Input
                      label="Razón social: "
                      // value={formData.razonSocial}
                      value="Brayan Quiroz"
                      className="bg-neutral-200 Inputdisabled mr-[1rem] w-[370px]"
                      disabled
                    />
                    <Input
                      label="Correo: "
                      onChange={(e) => {
                        setFormData({ ...formData, correo: e.target.value });
                      }}
                      value={formData.correo}
                      className="w-[195px]"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="w-full bg-white mb-[0.8rem]">
                  <Selects
                    options={dataTransformedRoles}
                    placeholder="Seleccione tipo de usuario"
                    onChange={handleRol}
                    labelP="Tipo de usuarios:"
                    classNameDiv="w-[230px]"
                  />
                </div>
                <div className="flex">
                  <Selects
                    onChange={handleDoc}
                    options={dataTransformed}
                    placeholder="Seleccione documento"
                    labelP="Tipo de documento:"
                    classNameDiv="w-[230px] mr-[1rem]"
                  />
                  <Input
                    onChange={(e) => {
                      setFormData({ ...formData, numdoc: e.target.value });
                    }}
                    label="Número de identidad:"
                    value={formData.numdoc}
                    className="w-[200px]"
                  />
                  <Buttons
                    className="bg-redMain text-white h-[31.6px] self-end "
                    onClick={handleSearchDoc}
                  >
                    Buscar
                  </Buttons>
                </div>
                <div className="flex mt-[0.5rem]">
                  <Input
                    disabled
                    label="Nombres: "
                    value={formData.codusu}
                    className="bg-neutral-200 Inputdisabled w-[230px] mr-[1rem]"
                  />
                  <Input
                    label="Apellidos: "
                    value={formData.apellidos}
                    className="bg-neutral-200 Inputdisabled mr-[1rem]"
                    disabled
                  />
                  <Input
                    label="Correo: "
                    onChange={(e) => {
                      setFormData({ ...formData, correo: e.target.value });
                    }}
                    value={formData.correo}
                    className="w-[195px]"
                  />
                </div>
              </>
            )}
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default UsuariosInternos;
