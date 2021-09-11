import React, {useState, useEffect} from "react";
import { store } from "./firebaseStor";


function App() {


  const [edicion, setEdicion] = useState(null);
  const [err, setErr] = useState(null);


  const [id_usuario, setId_usuario] = useState('');
  const [cedula_usuario, setCedula_usuario] = useState('');
  const [nombre_usuario, setNombre_usuario] = useState('');
  const [telefono_usuario, setTelefono_usuario] = useState('');
  const [mail_usuario, setMail_usuario] = useState(''); 
 
  const [usuariosT, setUser] = useState([]);

  


  useEffect(()=>{
    
    const getUsers = async()=>{

      const {docs} = await store.collection('TBL_USUARIO').get();      
      const newArry = docs.map(item=>( {id:item.id, ...item.data()} ));
      setUser(newArry);


    }//getUsers

    getUsers();

     
  },[]);


  const crearUsuario = async(e) =>{

    e.preventDefault(); //Para que no se vaya a otra ruta

    if (
      !cedula_usuario.trim()||
      !nombre_usuario.trim()||
      !telefono_usuario.trim()||
      !mail_usuario.trim()       
    ) {
      setErr('Todos los campos obligatorios');      
    }//End if

    

    try {
      
      const dataSend = {
        cedula_usuario: cedula_usuario,
        nombre_usuario: nombre_usuario,
        telefono_usuario: telefono_usuario,
        mail_usuario: mail_usuario
      };//End dataSend

      await store.collection('TBL_USUARIO').add(dataSend);

      const {docs} = await store.collection('TBL_USUARIO').get();      
      const newArry = docs.map(item=>( {id:item.id, ...item.data()} ));
      setUser(newArry);
       
      
    } catch (e) {
      console.log(e);
    }//End try catch
    
   reiniciarValores();    


  };//End addUser

  const reiniciarValores=()=>{

    setCedula_usuario('');
    setNombre_usuario('');
    setTelefono_usuario('');
    setMail_usuario('');
    setEdicion(false);
    setErr(null);

  };//End reiniciarValores

  const borrarUsuario=async(id)=>{

    try {
      
      await store.collection('TBL_USUARIO').doc(id).delete();

      const {docs} = await store.collection('TBL_USUARIO').get();      
      const newArry = docs.map(item=>( {id:item.id, ...item.data()} ));
      setUser(newArry);

    } catch (e) {
      console.log(e);
    }//end trycatch


    //Reinicar valores
    reiniciarValores();

  };//End borrar

  const getData=async(id)=>{

    try {
      const data = await store.collection('TBL_USUARIO').doc(id).get();
      console.log(data.data());
      const {cedula_usuario,mail_usuario,nombre_usuario,telefono_usuario} = data.data();

      setCedula_usuario(cedula_usuario);
      setMail_usuario(mail_usuario);
      setNombre_usuario(nombre_usuario);
      setTelefono_usuario(telefono_usuario);

      setId_usuario(id);
      setEdicion(true);

      
    } catch (e) {
      console.log(e);
    }//End trycatch



  };//End actualizar

  const actualizarUsuario=async(e)=>{

    e.preventDefault();

    if (
      !cedula_usuario.trim()||
      !nombre_usuario.trim()||
      !telefono_usuario.trim()||
      !mail_usuario.trim()       
    ) {
      setErr('Todos los campos obligatorios');      
    }//End if

    const userUpdate = {
      cedula_usuario:cedula_usuario,
      nombre_usuario:nombre_usuario,
      mail_usuario:mail_usuario,
      telefono_usuario:telefono_usuario
    }//End const

    try {

      await store.collection('TBL_USUARIO').doc(id_usuario).set(userUpdate);

      const {docs} = await store.collection('TBL_USUARIO').get();      
      const newArry = docs.map(item=>( {id:item.id, ...item.data()} ));
      setUser(newArry);
      
    } catch (error) {
      
    }//end trycatch

    reiniciarValores();
    setId_usuario('');

  };//End setUpdate

  return (
  
    <div className="container">

    <div className="row">
      <div className="col">
     <h2>CRUD Usuarios</h2>

        <form onSubmit={edicion?actualizarUsuario:crearUsuario} className="form-group">
          
          <input type="text"
          onChange={(e)=>setCedula_usuario(e.target.value)}
          placeholder="Ingrese cedula"
          className="form-control"
          value={cedula_usuario}
          />

          <input type="text"
          onChange={(e)=>setNombre_usuario(e.target.value)}
          placeholder="Ingrese nombre"
          className="form-control mt-1"
          value={nombre_usuario}
          />

          <input type="text"
          onChange={(e)=>setMail_usuario(e.target.value)}
          placeholder="Ingrese mail"
          className="form-control mt-1"
          value={mail_usuario}
          />

          <input type="text"
          onChange={(e)=>setTelefono_usuario(e.target.value)}
          placeholder="Ingrese teléfono"
          className="form-control mt-1"
          value={telefono_usuario}
          />
          
          {
            edicion?(
              <input type="submit" value='Editar' className="btn btn-info w-100 mt-3"/>
            ):(
              <input type="submit" value='Registrar' className="btn btn-dark w-100 mt-3"/>
            )
          }
          
        </form>

        {
          err?(
            <div className="text-danger">
              {err}
            </div>
          ):(<span></span>)
        }

      </div>
      <div className="col">
        <h2>Lista de Usuarios</h2>

        <ul className="list-group">
          {
            usuariosT.length !==0 ? (
                              
            usuariosT.map(item=>(            
              
              <li key={item.id} className="list-group-item">
                {item.nombre_usuario} - {item.mail_usuario}
                <button
                className="btn btn-danger float-end"
                onClick={(id_usuario)=>{borrarUsuario(item.id)}}
                >
                  Borrar
                </button>
            
                <button
                className="btn btn-info mr-3 float-end"
                onClick={(id_usuario)=>{getData(item.id)}}
                >
                  Actualizar
                </button>
               
                
              </li>

            ))):(
              <span>No hay usuarios registrados</span>
            )
          }
        </ul>

      </div>
    </div>

    </div>

  );
}

export default App;
