import styles from './styles.module.scss'
import HorizontalCard from '../HorizontalCard/HorizontalCard'

interface HorizontalRowProps {
  cardData: any[]
}

const HorizontalRow: React.FC<HorizontalRowProps> = ({cardData}) => {
  return (
    <div className={styles.container}>
      {cardData.map((item, index) => (
        <HorizontalCard cardItem={item} key={index}/>
      ))}
     
    </div>
  )
}

export default HorizontalRow