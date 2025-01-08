
import { ITabArr } from "../../../interface/UI";
import { useTabStore } from "../../../store/useTabStore";
import styles from "./styles.module.scss";
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";


// props
interface TabSectionProps {
  dataTab: ITabArr[]
}

// style-inline
const tabStyle = {
    width: "fit-content",
    bg: "rgba(255, 255, 255, 0.15)",
    color: "white",
    fontWeight: "600",
    fontSize: "14px",
    _selected: {
        bg: "rgba(255, 255, 255, 1)",
        color: "black",
        borderRadius: "rounded",
        transition: "all 0.2s",
    },
};

const TabSection:React.FC<TabSectionProps> = ({dataTab}) => {
  const activeTab = useTabStore((state) => state.activeTab);
  const setActiveTab = useTabStore((state) => state.setActiveTab);
  const activeIndex = dataTab.findIndex((tab) => tab.title === activeTab);

  const handleTabChange = (index: number) => {
    setActiveTab(dataTab[index]?.title || "All"); // Update the active tab in the store
  };
  return (
    <Tabs
      isLazy
      index={activeIndex >= 0 ? activeIndex : 0} onChange={handleTabChange}
      defaultIndex={0}
      className={styles.container}
      variant="soft-rounded"
    >
      <TabList border={"none"} columnGap={2} className={styles.tabList}>
        {dataTab?.map((tab, index) => (
            <Tab key={index} sx={tabStyle}>{tab.title}</Tab>
        ))}

      </TabList>
      <TabPanels className={styles.tabPanels}>
     
     {dataTab?.map((tabPanel, index) => (
      <TabPanel key={index} className={styles.tabPanel}>
            {tabPanel.component}
        </TabPanel>
     ))}
        
      </TabPanels>
    </Tabs>
  );
};

export default TabSection;
