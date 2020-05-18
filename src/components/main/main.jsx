import React, { Component } from 'react';
import Header from '../header/header';
import Sortable from '../sortable/sortable';
import { arrayMove } from 'react-sortable-hoc';

class main extends Component{
  constructor(props) {
    super(props) 
    this.state = {photos:[]};
  }
  
  getPhotos = (photos) => {
    this.setState({photos: photos});
    console.log(photos.length);
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({photos}) => ({
      photos: arrayMove(photos, oldIndex, newIndex),
    }));
  };
  
  render() {
    const { photos } = this.state; 
    return (
      <div>
        <Header getPhotos = { this.getPhotos } />
        
        <Sortable photos = { this.state.photos } 
         onSortEnd = { this.onSortEnd }/>
      </div>	
    );
  }
}
export default main;