import React, { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import useAuth from '../context/AuthContext';
import { isOnboardingVisited } from '../helpers/userData';
import { useModal } from '../context/ModalContext';
import { updateUserData } from '../helpers/apiCalls';
import OnboardingCarousel from './OnboardingCarousel';
import onboardingList from '../helpers/onboardingData';

/**
 * OnboardingModal component renders a modal for onboarding with user data and handles its close button.
 * @param {Object} userData - The user data object.
 * @param {Function} setContent - Function to set the content of the modal.
 * @param {ReactNode} children - The child components of the modal.
 * @returns {ReactNode} The rendered OnboardingModal component.
 */
const OnboardingModal = ({ userData, setContent, children }) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(updateUserData, {
    onSuccess: () => {
      queryClient.invalidateQueries('currentUser');
    }
  });

  useEffect(() => {
    /**
     * Handles the click event on the modal close button.
     */
    const handleButtonClick = () => {
      mutate(JSON.stringify(userData));
      setContent();
    };

    const button = document.getElementById('modal-close');
    button.addEventListener('click', handleButtonClick);

    const overlay = document.getElementById('modal-overlay');
    overlay.addEventListener('click', handleButtonClick);

    return () => {
      button.removeEventListener('click', handleButtonClick);
      overlay.removeEventListener('click', handleButtonClick);
    };
  }, [userData, setContent, mutate]);

  return <>{children}</>;
};

/**
 * Onboarding component manages the onboarding process based on user data and current URL.
 * @returns {ReactNode} The rendered Onboarding component.
 */
const Onboarding = () => {
  const { userData } = useAuth();
  const { setContent, setModalType, setModalTitle, setTitleCallout } = useModal();
  const modalType = 'onboarding';
  const currentURL = window.location.pathname;
  const currentOnboardingData = [];

  // Check if current URL matches the paths. If so, then add the data to currentOnboardingData
  for (const onboardingItem of onboardingList) {
    const { pages } = onboardingItem;

    // Skip if the user has already visited this feature
    if (isOnboardingVisited(onboardingItem.feature, userData)) {
      continue;
    }

    if (pages) {
      const matchingPage = pages.find((page) => {
        const pageWithNumbers = page.replace(/{number}/g, '[0-9]+');
        const regex = new RegExp(`^${pageWithNumbers}$`);

        if (page === 'all') {
          return currentURL;
        }

        return regex.test(currentURL);
      });

      if (matchingPage) {
        currentOnboardingData.push(onboardingItem);
      }
    }
  }

  useEffect(() => {
    checkForOnboarding();
  }, [userData]);

  /**
   * Checks for pending onboarding steps and sets the modal content if there is any.
   */
  const checkForOnboarding = () => {
    if (currentOnboardingData.length === 0 || !userData) {
      return;
    }

    let nextOnboardingData = null;

    for (const onboardingData of currentOnboardingData) {
      const isOnboardedValue = isOnboardingVisited(onboardingData?.feature, userData);
      if (!isOnboardedValue) {
        nextOnboardingData = onboardingData;
        break;
      }
    }

    if (nextOnboardingData) {
      const updatedUserData = {
        ...userData,
        user_data: {
          ...userData.user_data,
          onboarding: { ...userData.user_data.onboarding, [nextOnboardingData.feature]: true }
        }
      };
      setModalType(modalType);
      setTitleCallout(nextOnboardingData.callout);
      setModalTitle(nextOnboardingData.title);
      setContent(
        <OnboardingModal userData={updatedUserData} setContent={checkForOnboarding}>
          <OnboardingCarousel slides={nextOnboardingData.slides} />
        </OnboardingModal>
      );
    } else {
      setContent(); // This would clear out the modal content
    }
  };
};


export default Onboarding;
