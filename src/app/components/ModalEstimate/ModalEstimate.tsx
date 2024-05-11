import { useAppDispatch, useAppSelector } from "@/hooks/hooks"
import { closeEstimateModal, setCurrentEstimage, setUserGrade } from "@/store/appReducer";
import { Button, Flex, Modal, Rating } from "@mantine/core";
import classes from './modalEstimate.module.scss';
import Image from "next/image";
import close from '@/assets/Close.svg';
import { Title } from "../Title/Title";
import { useState } from "react";

export const ModalEstimate = () => {
  const dispatch = useAppDispatch();
  const { isOpenModal, currentEstimateItem } = useAppSelector((state) => state);
  const {original_title, user_grade} = currentEstimateItem;

  const closeModal = () => dispatch(closeEstimateModal());

  const setModalGrade = (operation = '') => {
    const dataGrade = {user_grade: user_grade, original_title: original_title, operation: operation};
    dispatch(setUserGrade(dataGrade));
  }

  return (
    <Modal.Root 
      opened={isOpenModal} 
      pos={'absolute'}
      left={0}
      onClose={closeModal} 
      centered
      classNames={{
        root:  classes.modal,
        header: classes.modal__header,
        body: classes.modal__body,
      }}
    >
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Your rating</Modal.Title>
            <button onClick={closeModal} className={classes.modal__close__button}>
              <Image src={close} alt={"close_button"} />
            </button>
          </Modal.Header>
          <Modal.Body>
            <Title className={classes.modal__body__title} tag="h2" title={original_title} />
            <Rating 
              className={classes.modal__rating}
              defaultValue={user_grade} 
              onChange={(grade) => dispatch(setCurrentEstimage({original_title, user_grade: grade}))}
              count={10} 
              size={"lg"}  
            />
            <Flex direction={'row'} gap={16}>
              <Button 
                size="md" 
                onClick={() => setModalGrade('saveGrade')}
                classNames={{
                  root: classes.modal__save__button
                }}>
                Save
              </Button>
              <Button 
                onClick={() => setModalGrade('removeGrade')}
                size="md"
                classNames={{
                  root: classes.modal__remove__button
                }}>
                Remove rating
              </Button>
            </Flex>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>)
}