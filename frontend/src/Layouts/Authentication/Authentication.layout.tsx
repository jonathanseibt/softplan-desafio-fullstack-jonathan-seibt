import React from "react";
import { observer } from "mobx-react";

const Layout: React.FC = observer((_props) => {
  return (
    <>
      <div>Authentication.layout.tsx</div>
      {_props.children}
    </>
  );
});

export default Layout;
