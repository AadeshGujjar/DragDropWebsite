import React from 'react';
import "./App";



var savedPositions =[];

export default class Draggable extends React.Component{
    state= {
        isDragging:false,

        originalX: 0,
        originalY: 0, //original pos of the element

        translateX: 0, //change in position
        translateY: 0,

        lastTranslateX: 0,
        lastTranslateY: 0, //laste place of the element , initially 0
    };
    

handleMouseDown = ({clientX , clientY}) =>{
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);

    this.setState({
        originalX: clientX,
        originalY: clientY,
        isDragging: true,
    });
};


handleMouseMove = ({clientX , clientY})=>{
    const {isDragging}=this.state;
    
    
    if(!isDragging){
        return;
    }

    this.setState(pervState=>({
        translateX: clientX - pervState.originalX + pervState.lastTranslateX,
        translateY: clientY - pervState.originalY + pervState.lastTranslateY,
    }));

};


handleMouseUp=()=>{
    window.removeEventListener('mousemove',this.handleMouseMove);
    window.removeEventListener('mouseup',this.handleMouseUp);
    
    console.log(this.state.translateX);
    console.log(this.state.translateY);
    
    const finalX=this.state.translateX;
    const finalY=this.state.translateY;
    
    var finalCoods={
        xCood:finalX,
        yCood:finalY,
    }


    savedPositions.push(JSON.stringify(finalCoods));
    console.log(typeof(savedPositions));
    console.log(savedPositions);

    var storedCoordinates= localStorage.getItem("storedCoordinates");

    function save(){
        //var Item= document.getElementById("coordinates");
        localStorage.setItem("storedCoordinates", savedPositions);
        document.getElementById("coordinates").innerHTML=savedPositions + "<br>";
    }
    save();

    this.setState({
        originalX:0,
        originalY:0,
        lastTranslateX:finalX,
        lastTranslateY:finalY,
        isDragging:false,
    })
};




    render() {

        const { children } = this.props;
        const { translateX, translateY, isDragging } = this.state;

        return(
            <div
            onMouseDown={this.handleMouseDown}
            x={translateX}
            y={translateY}
            isDragging={isDragging}
            style={{transform:`translate(${translateX}px, ${translateY}px)`}}
            >
             {children}
            </div>
        );
    }
}


