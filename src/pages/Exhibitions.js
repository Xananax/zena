import React from 'react'
import { Content } from '../wrappers/Content'
import { Image } from '../utils/Image'
import { validators, subscribe } from '../data/events'
import { dispatch } from '../data/controller'
import { Spinner } from '../utils/Spinner'
import { Editable } from '../utils/form/Editable'
import { ModalWithTrigger } from '../utils/Modal'
import css from './Exhibitions.module.css'

export const Event = ({ action, ...values}) =>
  <Editable action={action} collection="events" dispatch={dispatch} className={css.event} values={values} validators={validators}>
    <h2 className={css.title} name="title"/>
    <h4 className={css.date} name="date"/>
    <div className={css.description} name="description" inputType="textarea"/>
    <Image cover className={css.image} loaded name="image" inputType="file"/>
  </Editable>


export class Exhibitions extends React.Component{

  state = { events: [], loading:true }
  
  componentDidMount(){ this.unsubscribe = subscribe( events => this.setState({events,loading:false})) }

  componentWillUnmount(){ this.unsubscribe && this.unsubscribe(); }

  render(){
    const { state:{ events, loading } } = this
    return (
      <Content title="Events & Exhibitions">
        { loading
        ? <Spinner inverted/>
        : <>
          { events.map(event=><Event action="update" key={event.id} {...event}/>)}
          <ModalWithTrigger trigger={({toggle})=><button className="ok big" onClick={toggle}>+</button>}>
            <Event action="create"/>
          </ModalWithTrigger>
          </>
        }
      </Content>
    )
  }
}