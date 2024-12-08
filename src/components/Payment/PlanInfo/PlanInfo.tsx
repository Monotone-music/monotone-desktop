import styles from './styles.module.scss'
import { Box } from '@chakra-ui/react'
import PlanCard from '../PlanCard/PlanCard'
import plans from '../../../data/planCard';


const PlanInfo = () => {
  return (
    <Box className={styles.container}>
        <Box className={styles.title}>Our Plans</Box>

        <Box className={styles['plan-wrapper']}>
            {plans.map((item, index) => (
                      <PlanCard {...item} key={index}/>
            ))}
        </Box>
    </Box>
  )
}

export default PlanInfo