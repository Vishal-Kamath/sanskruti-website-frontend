import { SearchType, closeNotification } from '@/slice/notification.slice';
import { useAppDispatch } from '@/store/hooks';
import { RxCross2 } from 'react-icons/rx';
import React from 'react';

const Notification: React.FC<SearchType> = ({ message, type }) => {
  const dispatch = useAppDispatch();
  const close = () => dispatch(closeNotification());
  return (
    <div
      className={`absolute left-1/2 top-3 flex w-full max-w-md -translate-x-1/2 gap-2 rounded-sm border-2 px-2 py-3 
        ${type === 'success' && 'border-green-500 bg-green-200 text-green-500'}
        ${type === 'warning' && 'border-red-500 bg-red-200 text-red-500'}
        ${type === 'info' && 'border-gray-500 bg-gray-200 text-gray-500'}
      `}
    >
      <div>{message}</div>
      <button className="ml-auto w-5" onClick={close}>
        <RxCross2 />
      </button>
    </div>
  );
};

export default Notification;
