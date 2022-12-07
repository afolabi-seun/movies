import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

const RouteGuard = (props) => {
  // const { component: Component, userData, ...rest } = props;
  const { component: Component, ...rest } = props;
  // const { token } = userData;

  useEffect(() => {
    // console.log(props);
  }, []);

  function hasJWT() {
    return token ? true : false;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        hasJWT() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/" }} />
        )
      }
    />
  );
};

// const mapStateToProps = (state) => ({
//   userData: state.auth.userData,
//   staticData: state.staticData,
// });
// const mapDispatchToProps = {};

export default RouteGuard //connect(mapStateToProps, mapDispatchToProps)(RouteGuard);
