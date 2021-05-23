import * as React from "react";
import { connect } from "react-redux";
import { revokeToken } from "../../redux/actions/auth/authActions";
import { RevokeTokenRequest } from "../../types/auth/auth";
interface IProps {
  logout: (request: RevokeTokenRequest) => void;
}
const LogOut = ({ logout }: IProps) => (
  <>
    <p>Logout page</p>
  </>
);

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => {
  return {
    logout: (request: RevokeTokenRequest) => dispatch(revokeToken(request)),
  };
};
export default connect(null, mapDispatchToProps)(LogOut);
