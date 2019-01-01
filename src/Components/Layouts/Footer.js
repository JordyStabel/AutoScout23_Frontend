import React from "react";
import { AppBar, Tab,Tabs, withWidth, Button } from "@material-ui/core";
import NavigationIcon from "@material-ui/icons/Navigation";

export default withWidth()(({ categories, category, onSelect, onSubmit, getCarByMake, isEmpty, width }) => {
  const index = category
    ? categories.findIndex(group => group === category) + 1
    : 0;

  const onIndexSelect = (event, index) => {
    onSelect(index === 0 ? "" : categories[index - 1]);
  };

  return (
    <AppBar position='static'>
      <Tabs
        value={index}
        onChange={onIndexSelect}
        indicatorColor="secondary"
        textcolor="secondary"
        scrollable={true}
        scrollButtons={"on"}
      >
        <Tab label="All" />
        {categories.map(group => <Tab key={group} label={group} />)}
          <Button variant="extendedFab" aria-label="Delete" style={{height: 'auto', margin: 6}} disabled={!isEmpty} onClick={onSubmit}>
              <NavigationIcon/>
              SUBMIT ORDER
          </Button>
          <Button variant="extendedFab" aria-label="Delete" style={{height: 'auto', margin: 6}} disabled={!isEmpty} onClick={() => getCarByMake("Porsche")}>
              <NavigationIcon/>
              PORSCHE
          </Button>
      </Tabs>
    </AppBar>
  );
});
