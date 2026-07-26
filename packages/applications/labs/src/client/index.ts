import { Prerender2PageComponent } from "../ui/pages/projects/prerender2/prerender2";
import { TopPageComponent } from "../ui/pages/top/top";

/* oxlint-disable no-unused-expressions -- Referencing each page component keeps
   it in the bundle, which is what pulls its CSS import into the extracted
   stylesheet. */
TopPageComponent;
Prerender2PageComponent;
/* oxlint-enable no-unused-expressions */
