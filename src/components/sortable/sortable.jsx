import React, {Component, useRef} from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import './sortable.css';


const SortableItem = SortableElement(({value}) => {
    return ( 
        <li className="photo-wrapper" onMouseDown={(e) => e.stopPropagation()}
        onMouseMove={(e) => e.stopPropagation()}
        onMouseUp={(e) => e.stopPropagation()}>
            <img src={localStorage[value]}></img>
        </li>
    )
});

let x = 0;
let y = 0;
let isdragging = false;

const dragStart = (e, dom) => {
    // e.preventDefault(); 
    isdragging = true;
    dom.style.top = e.pageY+'px';
    dom.style.left = e.pageX+'px';
    x = e.pageX;
    y = e.pageY; 
};

const dragEnd = (e, dom) => {
    // e.preventDefault();
    isdragging = false;
        // 1. for loop all elements 
        const parent = document.getElementsByClassName('photos-list-container')[0];
        Array.from(parent.children).forEach(child => {
            if (_boxIntersects({
               top: y,
               left: x,
               width: dom.clientWidth,
               height: dom.clientHeight 
            }, {
                top: child.offsetTop,
                left: child.offsetLeft,
                width: child.clientWidth,
                height: child.clientHeight
            })) {
                child.style.backgroundColor = 'blue';
            } else {
                child.style.backgroundColor = 'transparent';
            }
        })  
    dom.style.width = 0;
    dom.style.height = 0;
};

const _boxIntersects = function(boxA, boxB) {
    if(boxA.left <= boxB.left + boxB.width &&
      boxA.left + boxA.width >= boxB.left &&
      boxA.top <= boxB.top + boxB.height &&
      boxA.top + boxA.height >= boxB.top) {
      return true;
    }
    return false;
  };


const drag = (e, dom) => {
    const width = Math.abs(e.pageX - x);
    const height = Math.abs(e.pageY - y);
    dom.style.height = height + 'px';    // 1. for loop all elements 
    dom.style.width = width + 'px';  
};

const SortableList = SortableContainer(({photos}) => {
  return (

    <ul 
    className="photos-list-container">
      {photos.map((value, index) => (
        <SortableItem key={`item-${value}`} index={index} value={value} />
      ))}
    </ul>
  );
});

class Sortable extends Component{
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }
    render() {
        return (
        <div style={{ position:'relative' }}onMouseDown={e => dragStart(e, this.ref.current)}
             onMouseUp={e => dragEnd(e, this.ref.current)} 
             onMouseMove={e => isdragging && drag(e, this.ref.current)}>
            <SortableList photos={this.props.photos} onSortEnd={this.props.onSortEnd} />
            <div ref= { this.ref } className="drag-select"></div>            
        </div>
        );
    }
}
export default Sortable;