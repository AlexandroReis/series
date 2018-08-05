import React,{Component} from 'react'
import api from './Api'
import {Redirect} from 'react-router-dom'
import { throws } from 'assert';

const statuses ={

    'watched':'Assistido',
    'watching':'Assistindo',
    'toWatch':'Assistir'
}


class NewSeries extends Component{
    constructor(props){

        super(props)
        this.state={
          //count:0
          genres:[],
          isLoading : false,
          redirect: false

        }
        this.saveSeries = this.saveSeries.bind(this)
      }

      componentDidMount(){
        this.setState({ isLoading:true})
        api.loadGenres()
       .then((res)=>{
         this.setState({
         isLoading:false,
         genres:res.data
       })
      })
    }

saveSeries(){

    //alert('olá hohoohohoohoo mengo')
    //alert(this.refs.name.value)
    //return false

    const NewSeries ={

        name: this.refs.name.value,
        status: this.refs.status.value,
        genre: this.refs.genres.value,
        comments:this.refs.comment.value
    }
    //console.log(NewSeries)

    api.saveSeries(NewSeries)
    .then((res)=>{
        this.setState({
            redirect: '/series/'+this.refs.genres.value
        })
    })
    
}
render(){

    return (
        
    <section className="intro-section">
    {
        this.state.redirect &&     
        <Redirect to={this.state.redirect} />
        }
    <h1>Novas Series</h1><br/>
    <form>
        Nome:<input type="text" ref='name'  className="form-control"/><br/>
        Comentários: <textarea ref='comment' className="form-control"></textarea><br/>
        Status: <select ref='status'>
            {Object
                .keys(statuses)
                .map(key =><option key={key} value={key}>{statuses[key]}</option>)}
            </select><br/><br/><br/>


            Genêros: <select ref='genres'>
            
            {this.state.genres
                
                .map(key =><option key={key} value={key}>{key}</option>)}
            </select><br/><br/><br/>
            <button type="button" onClick={this.saveSeries}>Salvar</button>
        </form>
        </section>
        )
}
}
export default NewSeries