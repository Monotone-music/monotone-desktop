import styles from "./styles.module.scss";
import { Box, Icon, Text } from "@chakra-ui/react";
import { useQueueStore } from "../../../store/useUIStore";
import { IoCloseOutline } from "react-icons/io5";

const QueueActionBar = () => {
  const { toggleOpenQueue } = useQueueStore();
  const handleToggleQueue = () => {
    toggleOpenQueue(false);
  };
  return (
    <Box className={styles.container}>
      <Box className={styles["title-wrapper"]}>
        <Text className={styles.title} color={"white"}>
          Your Queue
        </Text>
      </Box>

      <Box
        className={styles["close-wrapper"]}
        onClick={() => handleToggleQueue()}
      >
        <Icon
          as={IoCloseOutline}
          boxSize={6}
          color={"gray"}
          cursor={'pointer'}
          _hover={{ color: "white" }}
        />
      </Box>
    </Box>
  );
};

export default QueueActionBar;
