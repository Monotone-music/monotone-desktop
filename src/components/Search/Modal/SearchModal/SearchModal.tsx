import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Box, Spinner } from '@chakra-ui/react'
import { useSearchStore, useUISearch } from '../../../../store/useUIStore';
import SearchTab from '../../Tabs/SearchTab/SearchTab';
import { ITabArr } from '../../../../interface/UI';
import AllSearchTab from '../../Tabs/AllSearchTab/AllSearchTab';
import SongSearchTab from '../../Tabs/SongSearchTab/SongSearchTab';
import AlbumSearchTab from '../../Tabs/AlbumSearchTab/AlbumSearchTab';
import { useAuthStore } from '../../../../store/useAuthStore';

const SearchModal = () => {
    const { isOpenModal } = useUISearch();
    const {token} = useAuthStore()
    const [showModal, setShowModal] = useState(false);
    const { results, loading, query } = useSearchStore()
    const { recording, artist, album } = results?.data || {};
   
    const tabArr: ITabArr[] = [
        { title: "All", component: <AllSearchTab token={token} album={album} recording={recording} artist={artist} /> },
        { title: "Songs", component: <SongSearchTab /> },
        { title: "Album", component: <AlbumSearchTab /> }
      ];

      useEffect(() => {
        if (isOpenModal && results !== null && query !== "") {
          setShowModal(true); // Slide down when results are available and search is active
        } else {
          setShowModal(false); // Slide up when no results or search query is empty
        }
      }, [isOpenModal, results, query]);

  return (
    <Box className={`${styles.container} ${showModal ? styles.slideDown : styles.slideUp}`}>
       {loading ? (
        <Box className={styles['loading']}>
          <Spinner size="lg" color="white" />
        </Box>
      ) : (
        <SearchTab dataTab={tabArr}/> 
      )}
    </Box>
  )
}

export default SearchModal