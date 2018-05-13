import React from 'react'
import { Spinner } from './Spinner'
import { ModalWithTrigger } from './Modal'

export class ReactFire extends React.Component{
  
  state = { items: [], loading:true }
  
  componentDidMount(){ this.unsubscribe = this.constructor.subscribe( items => this.setState({items,loading:false})) }

  componentWillUnmount(){ this.unsubscribe && this.unsubscribe(); }

  renderLoading(){
    return <Spinner inverted/>
  }

  isAdminMode(){
    const adminMode = window.location.href.indexOf('edit') >= 0
    return adminMode
  }

  renderCreateModal(){
    if(!this.isAdminMode()){ return null }
    return (
      <ModalWithTrigger trigger={({toggle})=><button className="ok big" onClick={toggle}>+</button>}>
        { this.renderCreateForm() }
      </ModalWithTrigger>
    )
  }
  
  renderCreateForm(){
    const Comp = this.constructor.Component
    return <Comp action="create" editMode={this.isAdminMode()}/>
  }

  renderCollection(){
    const Comp = this.constructor.Component
    const { items } = this.state
    return items.map(event=><Comp editMode={this.isAdminMode()} action="update" key={event.id} {...event}/>)
  }

  renderLoaded(){
    return (<>
    { this.renderCollection() }
    { this.renderCreateModal() }
    </>)
  }

  renderContent(){
    const { loading } = this.state
    return ( loading ? this.renderLoading() : this.renderLoaded() )
  }
}