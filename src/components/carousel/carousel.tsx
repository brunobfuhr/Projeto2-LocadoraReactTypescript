import Carousel from 'react-bootstrap/Carousel';
import  'bootstrap/dist/css/bootstrap.min.css' ;

function UncontrolledExample() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          height="780"
          src="https://images.unsplash.com/photo-1565043666747-69f6646db940?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FyJTIwcmVudGFsfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
          alt="First slide"
          />
        <Carousel.Caption>
          <h3>CrieTI Car Rental</h3>
          <p>Sistema de cadastros e gerenciamento para locadoras de veículos.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          height="780"
          src="https://www.fueloyal.com/wp-content/uploads/2018/07/Long-Term-Car-Rental-6-Reasons-Why-You-Should-Go-Ahead-With-It-1.jpg"
          alt="Second slide"
          />

        <Carousel.Caption>
          <h3></h3>
          <p>.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          height="780"
          src="https://c4.wallpaperflare.com/wallpaper/944/827/811/test-drive-buy-minivan-rent-wallpaper-preview.jpg"
          alt="Third slide"
          />

        <Carousel.Caption>
          <h3></h3>
          <p>
            
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;