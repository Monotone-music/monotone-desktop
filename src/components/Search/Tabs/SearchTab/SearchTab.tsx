import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import styles from "./styles.module.scss";
import { ITabArr } from "../../../../interface/UI";

interface TabSearchProps {
  dataTab: ITabArr[];
}

const tabStyle = {
  width: "fit-content",
  bg: "rgba(255, 255, 255, 0.15)",
  color: "white",
  fontWeight: "500",
  fontSize: "12px",
  _selected: {
    bg: "rgba(255, 255, 255, 1)",
    color: "black",
    borderRadius: "rounded",
    transition: "all 0.2s",
  },
};

const SearchTab: React.FC<TabSearchProps> = ({ dataTab }) => {
  return (
    <Tabs
      isLazy
      defaultIndex={0}
      className={styles.container}
      variant="soft-rounded"
    >
      <TabList border={"none"} columnGap={2}>
        {dataTab?.map((tab, index) => (
          <Tab key={index} sx={tabStyle}>
            {tab.title}
          </Tab>
        ))}
      </TabList>

      <TabPanels>
        {dataTab?.map((tabPanel, index) => (
          <TabPanel key={index} className={styles.tabPanel}>
            {tabPanel.component}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default SearchTab;
