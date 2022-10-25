import Carousel from 'react-bootstrap/Carousel';
import  'bootstrap/dist/css/bootstrap.min.css' ;

function UncontrolledExample() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          height="697"
          src="https://sx-content-labs.sixt.io/thirdlight/seo/branches/content_ustates_180411_mercedes_cclass_6.jpg"
          alt="First slide"
          />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          height="697"
          src="https://bestride.com/wp-content/uploads/2018/09/2018-Toyota-Yaris.jpg"
          alt="Second slide"
          />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          height="697"
          src="https://c4.wallpaperflare.com/wallpaper/944/827/811/test-drive-buy-minivan-rent-wallpaper-preview.jpg"
          alt="Third slide"
          />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;