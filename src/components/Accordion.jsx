import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function SimpleAccordion() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="blackie"
        >
          <h5 className=""> Edit Meal</h5>
        </AccordionSummary>
        <AccordionDetails>
          <form>
            <div>
              <input
                id="categories"
                type="text"
                placeholder="categories"
                name="categories"
              />
            </div>
            <div>
              <input id="name" type="text" placeholder="Name" name="name" />
            </div>
            <div>
              <input id="img" type="text" placeholder="Image Url" name="img" />
            </div>
            <div>
              <input
                id="desc"
                type="text"
                placeholder="description"
                name="description"
              />
            </div>
            <div>
              <input id="price" type="text" placeholder="price" name="price" />
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
