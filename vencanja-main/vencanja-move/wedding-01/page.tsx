import Wedding01 from "./Wedding01";
import { InviteConfigProvider } from "./InviteConfigContext";

const EssentialClassicPage = () => {
  return (
    <InviteConfigProvider>
      <Wedding01 />
    </InviteConfigProvider>
  );
};

export default EssentialClassicPage;
