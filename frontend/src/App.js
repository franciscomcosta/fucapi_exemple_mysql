import axios from 'axios'
import './App.css';
import { useState,useEffect } from 'react';



function App() {
  const [search, setSearch] = useState()
  const [name, setName] = useState()
  const [values, setValues] = useState()

  const handleChangeValues = async (event) =>{
    setSearch(() => event.target.value)
  }
  const teste = []




  useEffect(() => {
    axios.get('http://localhost:8800').then((res) =>{
     res.data.map((values) => {
      teste.push(values[0])
      if(teste !== name){
        setName(teste)
      }
     })
  }).catch((err) =>{
      console.log(err)
    })
  },[search])


  useEffect(()=>{
    console.log(search)
    axios.get("http://localhost:8800/by_name",{
      params:{
        name: search
      }
    }).then((res) =>{
      if(res !== [] && res){
        console.log(res)
        setValues([{
          nome: res.data[0][1],
          rua: res.data[0][2],
          cidade: res.data[0][5],
          estado: res.data[0][6],
          idade: res.data[0][9]
        }])
        console.log('oi',values)
      }
    }).catch((err) => {
      console.log(err)
    })
  },[search])


  return (
    <div className="App">
      <h1>Exemplo de utilização</h1>
      <select onChange={handleChangeValues}>
        <option value =" - "> -</option>
        {
        typeof(name) !== 'undefined' && name.map((res, index) => {
          return(
            <>
              <option key={index} value={res}>{res}</option>
            </>
          )
        })}
      </select>
      <table>
        {
          values && values.map((res) => {
            console.log(res);
            return(
              <>
              <thead>
              <th>
                Nome
              </th>
              <th>
                Rua
              </th>
              <th>
                Cidade
              </th>
              <th>
                Estado
              </th>
              <th>
                Idade
              </th>
              </thead>
              <tbody>
                <tr>
                  <td>{res.nome}</td>
                  <td>{res.rua}</td>
                  <td>{res.cidade}</td>
                  <td>{res.estado}</td>
                  <td>{res.idade}</td>
                </tr>
              </tbody>
            </>
            )
            
          })
        
        }
        </table>
    </div>
  );
}

export default App;
