import React, { useEffect, useState, useRef, SyntheticEvent, useCallback } from 'react'

import { trpc } from './utils/trpc'

import Background from './components/Background'
import Form from './components/Form'
import Step from './components/Step'
import Bar from './components/Bar'
import Content from './components/Content'
import TextField from './components/TextField'
import Email from './components/Email'
import Gender from './components/Gender'
import Birthday from './components/Birthday'
import TextArea from './components/TextArea'
import Next from './components/Next'
import RowBreak from './components/RowBreak'

import {ReactNotifications , Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

enum STEP{
  INIT,
  FIRST,
  SECOND,
  THIRD
}

function Survey() {
  // State for indicating which step should be expanded
  // 
  const [currStep, setCurrStep] = useState(STEP.INIT)
  // Reference for the form
  const formRef = useRef<HTMLFormElement>(null)
  // Reference for the fields of Step 1
  const firstNameRef = useRef<HTMLInputElement>(null)
  const surnameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  // Reference for the fields of Step 2
  const telRef = useRef<HTMLInputElement>(null)
  const genderRef = useRef<HTMLSelectElement>(null)
  const dayRef = useRef<HTMLInputElement>(null) // Birthday Ref
  const monthRef = useRef<HTMLInputElement>(null) // Birthday Ref
  const yearRef = useRef<HTMLInputElement>(null) // Birthday Ref
  // Reference for the fields of Step 3
  const commentRef = useRef<HTMLTextAreaElement>(null)

  // Database function for saving the survey
  const mutation = trpc.surveys.create.useMutation({
    onError: (error) => {
      // notify user about submission failure
      Store.addNotification({
        title: "Error",
        message: 'Submission failed. Error: ' + error.message,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true
        }
      });
    },
    onSuccess: () => {
      // notify user about successful submission
      Store.addNotification({
        title: "Successful",
        message: "Comment is submitted.",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true
        }
      });
      // Reset the form and return to first page
      formRef.current?.reset()
      setCurrStep(STEP.INIT)
    }
  })

  // combine Birthday from different textfield
  const combineBirthday = useCallback(() => {
    const day = dayRef.current?.value
    const month = monthRef.current?.value
    const year = yearRef.current?.value
    return `${year}-${month}-${day}` 
  },[dayRef, monthRef, yearRef])

  // validate birthday
  const validateBirthday = useCallback(() => {
    const parse = Date.parse(combineBirthday())
    const correct = parse && !Number.isNaN(parse) // check if it is correct date
    dayRef.current?.setCustomValidity(correct? '' : 'Please match the requested format')
    dayRef.current?.reportValidity()
    return correct
  },[dayRef, combineBirthday])

  // function for validating step 1
  const validateStep1 = useCallback(() => {
    return firstNameRef.current?.reportValidity() &&
        surnameRef.current?.reportValidity() &&
        emailRef.current?.reportValidity()
  },[surnameRef, emailRef])

  // function for validating step 2
  const validateStep2 = useCallback(()=>{
    return telRef.current?.reportValidity() && 
      genderRef.current?.reportValidity() &&
      monthRef.current?.reportValidity() &&
      yearRef.current?.reportValidity() &&
      validateBirthday() &&
      dayRef.current?.reportValidity()
  },[genderRef, monthRef, yearRef, validateBirthday])

  // function for validating step 3
  const validateStep3 = useCallback(()=>{
    return commentRef.current?.reportValidity()
  },[commentRef])

  // After changing the section(step), the validation runs.
  useEffect(()=>{
    switch(currStep){
      case STEP.FIRST:
        validateStep1();
        break;
      case STEP.SECOND:
        validateStep2()
        break;
      case STEP.THIRD:
        validateStep3()
        break;
      case STEP.INIT:
      default:      
        break;
    }
  },[currStep,validateStep1,validateStep2,validateStep3])

  return (
    <>
      <Background>
        <Form
          ref={formRef}
          onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault()
          }}
        >
          <Step>
            <Bar onClick={() => setCurrStep(STEP.FIRST)}>Step 1: Your Details</Bar>
            <Content show={currStep === STEP.INIT || currStep === STEP.FIRST}>
              <TextField id="firstname" title="First Name" control={firstNameRef} />
              <TextField id="surname" title="Surname" control={surnameRef} />
              <RowBreak />
              <Email id="email" title="Email Address" control={emailRef} />
              <RowBreak />
              <Next
                disabled={false}
                onClick={(event:SyntheticEvent) => {
                  event.preventDefault()
                  if (validateStep1()) setCurrStep(STEP.SECOND)
                }}
              />
            </Content>
          </Step>
          <Step>
            <Bar onClick={() => setCurrStep(STEP.SECOND)}>Step 2: More Comments</Bar>
            <Content show={currStep === STEP.SECOND}>
              <TextField id="tel" title="Telephone" control={telRef} pattern="[\+\-\(\)0-9]+" />
              <Gender id="gender" title="Gender" control={genderRef}/>
              <RowBreak />
              <Birthday id="birthday" title="Birthday" dayControl={dayRef} monthControl={monthRef} yearControl={yearRef}/>
              <RowBreak />
              <Next
                disabled={false}
                onClick={(event:SyntheticEvent) => {
                  event.preventDefault()
                  if (validateStep2()) setCurrStep(STEP.THIRD)
                }}
              />
            </Content>
          </Step>
          <Step>
            <Bar onClick={() => setCurrStep(STEP.THIRD)}>Step 3: Final Comments</Bar>
            <Content show={currStep === 3} alignItem="end">
              <TextArea title="Comments" id="comment" control={commentRef} />
              <Next
                half={true}
                disabled={!!mutation.isLoading}
                onClick={(event:SyntheticEvent) => {
                  event.preventDefault()
                  // Validate all the steps
                  // If any step is invalid, jump to that step
                  if (!validateStep3()) return                
                  if (!validateStep1()) {
                    setCurrStep(STEP.FIRST)
                    return
                  }
                  if (!validateStep2()) {
                    setCurrStep(STEP.SECOND)
                    return
                  }

                  // All validations are passed
                  // Save to database
                  mutation.mutate({
                    firstname: firstNameRef.current?.value || '',
                    surname: surnameRef.current?.value || '',
                    email: emailRef.current?.value || '',
                    tel: telRef.current?.value || '',
                    gender: genderRef.current?.value || '',
                    birthday: combineBirthday(),
                    comment: commentRef.current?.value || '' ,
                  })
                }}
              />
            </Content>
          </Step>
        </Form>
      </Background>
      <ReactNotifications/>

    </>
  )
}

export default Survey
