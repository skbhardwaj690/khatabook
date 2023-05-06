import { Link } from "react-router-dom";
import "../../assets/styles/error.css";

export const ErrorPage = (props) => {
  const errorTitle = props.errorTitle;
  const errorSubTitle = props.errorSubTitle;
  const redirect = props.redirect;
  return (
    <div className="page_404">
      <div className="row">
        <div className="col-sm-12 ">
          <div className="col-sm-10 text-center">
            <div className="four_zero_four_bg">
              <h1 className="text-center ">404</h1>
            </div>

            <div className="showImage"></div>

            <div className="contant_box_404">
              <h3 className="h2">{errorTitle || `Look like you're lost`}</h3>
              <br></br>

              <p>
                {errorSubTitle || `the page you are looking for not avaible!`}
              </p>

              <Link to={redirect || `/`} className="link_404">
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
