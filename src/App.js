import React, { Component } from 'react';
import MydModalWithGrid from '../src/components/reactModal';
 
const generateFruitLocaton = () =>{
  const min = 1;
  const max = 98;
  const top = Math.floor((min + Math.random() * (max - min)/4))*4;
  const left = Math.floor((min + Math.random() * (max - min)/4))*4; 
  // const fruitLocation = {
  //   top:`${top}%`,
  //   left:`${left}%`
  // }
  return [left,top];
}

class App extends Component {
  state={
    modalShow: true,
    speed:500,
    direction:'RIGHT',
    fruit:generateFruitLocaton(),
    snakeDots:[
      [0,0],
      [4,0],
      [8,0]
    ]
  }

  componentDidMount(){ 
    //setInterval(this.snakeMovement,this.state.speed);
    document.onkeydown = this.changeDirection;
  }

  componentDidUpdate(){
    this.checkIfSnakeHitSelf();
    this.checkIfSnakeHitWall(); 
    // this.updateScore();
  }

  changeDirection = (e) =>{
    e=e||window.event; 
    switch(e.keyCode){
      case 37:
      if(this.state.direction!='RIGHT')
      {
      this.setState({direction:'LEFT'});
      }
      break;
      case 38:
      if(this.state.direction!='DOWN')
      {
      this.setState({direction:'UP'});
      }
      break;
      case 39:
      if(this.state.direction!='LEFT')
      {
        this.setState({direction:'RIGHT'});
      }
      break;
      case 40:
      if(this.state.direction!='UP')
      {
      this.setState({direction:'DOWN'});
      }
      break;
    }
  }

  checkIfSnakeHitWall= ()=>{
    let dots  = [...this.state.snakeDots];
    let head =  dots[dots.length-1];
    if(head[0]>=100 || head[0]<0 || head[1]>=100 || head[1]<0)
    {
      this.endGame();
    } 
  }

  checkIfSnakeHitSelf = () =>{
    let dots  = [...this.state.snakeDots];
    let head =  dots[dots.length-1];
    dots.pop();
    dots.forEach(dot=>{
      if(head[0]==dot[0] && head[1]==dot[1])
      {
        console.log(head,dot,'self');
        this.endGame();
      }
    }) 
  }

  snakeMovement= () => {
    let dots  = [...this.state.snakeDots];
    let head =  dots[dots.length-1];
    // console.log(head,'head');
    switch(this.state.direction){
      case 'LEFT':
      head = [head[0]-4,head[1]];
      break;
      case 'UP':
      head = [head[0],head[1]-4]; 
      break;
      case 'RIGHT':
      head = [head[0]+4,head[1]];
      break;
      case 'DOWN':
      head = [head[0],head[1]+4]; 
      break;
    }
    dots.push(head); 
    dots.shift(); 
    this.setState({
      snakeDots:dots
    });
    
    
    if(head[0]==this.state.fruit[0] && head[1]==this.state.fruit[1])
    { 
      console.log(head,this.state.fruit);
      this.state.fruit = generateFruitLocaton();
      this.state.snakeDots.push(head);
    } 
  }

  endGame = () =>{ 
    alert("Game Ended");
    this.setState({ 
      speed:500,
      direction:'RIGHT',
      fruit:generateFruitLocaton(),
      snakeDots:[
        [0,0],
        [4,0],
        [8,0]
      ] 
    })
  }
  

  render() {
    let modalClose = () => this.setState({ modalShow: false });
    return (
      <div>
      <h5>Score - {(this.state.snakeDots.length-3)*10}</h5>
      <div className="game-area">
        <Snake snakeDots={this.state.snakeDots}/>
        <Fruit fruitLocation={this.state.fruit}/> 
        <MydModalWithGrid show={this.state.modalShow} onHide={modalClose}/>
      </div>
      </div>
    );
  }
}

class Snake extends Component{
render(){
  return(
    <div>
    {
      this.props.snakeDots.map((dot,i)=>{
        const style = {
          left:`${dot[0]}%`,
          top:`${dot[1]}%`
        }
        return(
          <div className="snake-dot" key={i} style={style}></div>  
        )
      })
    } 
    </div>
  )
}

}
 
class Fruit extends Component{
 

  render(){
    const style = {
      left:`${this.props.fruitLocation[0]}%`,
      top:`${this.props.fruitLocation[1]}%`
    } 
    return(
      <div className="snake-fruit"  style={style}></div> 
    )
  }
  

}

export default App;
