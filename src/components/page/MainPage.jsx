import React, { useEffect, useState } from 'react';
import MainCard from '../Card/MainCard';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import apiClient from '../../services/apiClient';
import style from './MainPage.module.css';
import { USER_ID } from '../../constants/userId';

const MainPage = () => {
  const navigate = useNavigate();
  // const { USER_ID } = useParams(); // URL에서 userId 가져오기

  const [userName, setUserName] = useState('');
  const [isStudentCouncil, setIsStudentCouncil] = useState(false);
  const [requestsCount, setRequestsCount] = useState(null); // "3건 존재" 처리용

  // 오늘 날짜 동적으로 계산
  const today = new Date();
  const year = today.getFullYear(); // 년도 (예: 2024)
  const month = today.getMonth() + 1; // 월 (0부터 시작하므로 +1 필요, 예: 11)
  const day = today.getDate(); // 일 (예: 27)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 사용자 정보 API 호출
        const response = await apiClient.get(`api/v1/users/${USER_ID}`);
        const { name, studentCouncilId } = response.data;
        console.log(response.data);

        setUserName(name);
        setIsStudentCouncil(studentCouncilId !== null); // 학생회 여부 설정
        // 요청 건수는 여기서 처리 가능
        setRequestsCount(null); // "3건 존재" 부분은 유지
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, [USER_ID]);

  return (
    <div className={style.container}>
      {/* 프로필 카드 */}
      <div className={style.profileCard}>
        <div className={style.profileCardBox}>
          <div className={`circle ${style.profileImage}`}>
            <ion-icon name="person"></ion-icon>
          </div>
          <span>{userName + '님' || '관리자님'}</span>
          <div
            className={style.backButtonBox}
            onClick={() => navigate('/mypage')}
          >
            <ion-icon name="chevron-forward"></ion-icon>
          </div>
        </div>
        <div className={style.profileTextBox}>
          <span>오늘 대운동장에서 피크닉 어때요?</span>
        </div>
      </div>

      {/* 날짜 및 요청/반납 상태 카드 */}
      {isStudentCouncil ? (
        <div className={style.dateCard}>
          <p className={style.dateText}>{`${year}년 ${month}월 ${day}일`}</p>
          <p className={style.untilText}>들어온 요청</p>
          <p className={style.dDayText}>
            {requestsCount !== null ? `${requestsCount}건 존재` : ''}
          </p>
        </div>
      ) : (
        <div className={style.dateCard}>
          <p className={style.dateText}>{`${year}년 ${month}월 ${day}일`}</p>
          <p className={style.untilText}>반납기한까지</p>
          <p className={style.dDayText}>1DAY 2H</p>
        </div>
      )}

      {/* 카드 섹션 */}
      <div className={style.itemCardBox}>
        <MainCard
          title={isStudentCouncil ? '물품 관리' : '물품 대여'}
          description={
            isStudentCouncil
              ? '물품을 관리할 수 있어요'
              : '물품을 대여할 수 있어요'
          }
          backgroundColor="var(--card-background-gray)"
          titleColor="black"
          descriptionColor="var(--sub-text-gray)"
          icon="bag-check"
          iconColor="var(--sub-text-gray)"
          iconOverlayColor="#d5d9e0"
          onClick={
            isStudentCouncil
              ? () => navigate('/manage/item')
              : () => navigate('/rent')
          }
        />
        <MainCard
          title={isStudentCouncil ? '대여 및 반납 관리' : '반납 신청'}
          description={
            isStudentCouncil
              ? '대여와 반납을 간편하게'
              : '물품을 반납할 수 있어요'
          }
          backgroundColor="var(--card-background-gray)"
          titleColor="black"
          descriptionColor="var(--sub-text-gray)"
          icon="bag-remove"
          iconColor="var(--sub-text-gray)"
          iconOverlayColor="#d5d9e0"
          onClick={
            isStudentCouncil
              ? () => navigate('/reservation/info')
              : () => navigate('/rent/return')
          }
        />
      </div>
      <MainCard
        title={isStudentCouncil ? '학생 유저 승인' : '대여 정보'}
        description={
          isStudentCouncil
            ? '학생 유저의 회원가입을 승인할 수 있어요'
            : '대여 정보를 확인할 수 있어요'
        }
        backgroundColor="#b4bfb6"
        titleColor="white"
        descriptionColor="white"
        icon="library"
        iconColor="#727c74"
        iconBackgroundColor="#9DB0A3"
        iconOverlayColor="#9DB0A3"
        onClick={
          isStudentCouncil ? () => {} : () => navigate('/rent/info')
        }
      />
    </div>
  );
};

MainPage.propTypes = {
  userId: PropTypes.string,
};

export default MainPage;