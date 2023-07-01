import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { allBehaviorMaps } from '../helpers/apiCalls';
import HabitsList from '../components/HabitsList';
import Pagination from '../components/Pagination';
import useAuth from '../context/AuthContext';

const UnlockAllBehaviorMaps = () => {
  return <div className=""></div>;
};

const AllHabits = () => {
  const { userData } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useQuery(['allBehaviorMaps', currentPage], () =>
    allBehaviorMaps(currentPage)
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <div className="w-full">
      {data && data.courses && <HabitsList list={data.courses} />}
      {data && data.pagination && (
        <Pagination
          currentPage={currentPage}
          totalPage={data.pagination.total_pages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default AllHabits;
