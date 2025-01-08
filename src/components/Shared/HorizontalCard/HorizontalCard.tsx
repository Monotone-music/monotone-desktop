import { useQuery } from '@tanstack/react-query'
import styles from './styles.module.scss'
import { useAuthStore } from '../../../store/useAuthStore'
import { getAlbumImageByFileName } from '../../../service/album.api'
import { useNavigate } from 'react-router-dom'

interface HorizontalCardProps {
  cardItem: any
}

const HorizontalCard: React.FC<HorizontalCardProps> = ({cardItem}) => {
  const {token} = useAuthStore()
  const navigate = useNavigate();
  const {data: imageData} = useQuery({
    queryKey: ['horiCardImage', token, cardItem?.image?.filename],
    queryFn: () => getAlbumImageByFileName(cardItem?.image?.filename, token!)
  })
 
  const handleRedirectToDetailPage = (albumId: string) => {
    navigate(`/home/album/${albumId}`);
  };
  return (
    <div className={styles.container}
      onClick={()=> handleRedirectToDetailPage(cardItem._id)}
    >
      <div className={styles['img-wrapper']}>
        <img src={imageData} alt="" />
      </div>
      <div className={styles['card-title']}>
        <span className={styles.title}>{cardItem.title}</span>
      </div>
    </div>
  )
}

export default HorizontalCard