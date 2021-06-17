import React, { useState } from 'react'
import firebase from '../../firebase'
import md5 from 'md5'
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react'

import { Link } from 'react-router-dom'



const Register = () => {

    const [regInfo, setRegInfo] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        errors: [],
        loading: false,
        usersRef: firebase.database().ref('users')
    })



    const isFormValid = () => {
        let errors = [];
        let error;
        if (isFormEmpty(regInfo)) {
            error = { message: "Fill in all fields" };

            setRegInfo(prevState => {
                return { ...prevState, errors: errors.concat(error) }
            })
            return false;
        } else if (isPasswordValid(regInfo)) {
            error = { message: "Password is invalid" };
            setRegInfo(prevState => {
                return { ...prevState, errors: errors.concat(error) }
            })
            return false
        } else {
            return true
        }
    }

    const isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
        return !username.length || !email.length || !password.length || !passwordConfirmation.length;
    }
    const isPasswordValid = ({ password, passwordConfirmation }) => {
        if (password.length < 6 || passwordConfirmation.length < 6) {
            console.log("B")
            return false;
        } else if (password !== passwordConfirmation) {
            console.log("A")
            return false;
        } else {
            console.log("C")
            return true
        }
    }

    const displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>)

    const handleChange = event => {
        event.persist()
        setRegInfo(prevState => {
            return { ...prevState, [event.target.name]: event.target.value }
        })
    }
    const handleSubmit = event => {
        event.preventDefault();
        if (isFormValid()) {
            setRegInfo(prevState => {
                return { ...prevState, errors: [], loading: true }
            })

            firebase
                .auth()
                .createUserWithEmailAndPassword(regInfo.email, regInfo.password)
                .then(createdUser => {
                    console.log(createdUser)
                    createdUser.user.updateProfile({
                        displayName: regInfo.username,
                        photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
                    })
                        .then(() => {
                            saveUser(createdUser).then(() => {
                                console.log('user saved')
                            })
                        })
                        .catch(err => {
                            console.error(err);
                            setRegInfo(prevState => {
                                return { ...prevState, errors: regInfo.errors.concat(err), loading: false }
                            })
                        })
                })
                .catch(err => {
                    console.log(err)
                    setRegInfo(prevState => {
                        return { ...prevState, errors: regInfo.errors.concat(err), loading: false }
                    })
                })
        }
    }
    const saveUser = createdUser => {
        return regInfo.usersRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL
        })
    }
    const handleInputErrors = (errors, inputName) => {
        return errors.some(error =>
            error.message.toLowerCase().includes(inputName)
        )
            ? 'error'
            : ''
    }

    return (
        <Grid textAlign="center" verticalAlign="middle" className='app'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h1" icon color="violet" textAlign="center">
                    <Icon name="chess rook" color="violet" />
                        Register for Waibe
                    </Header>
                <Form onSubmit={handleSubmit} size="large">
                    <Segment stacked>
                        <Form.Input value={regInfo.username} fluid name="username" icon="user" iconPosition="left" placeholder="Username" type='text' onChange={handleChange} />
                        <Form.Input className={handleInputErrors(regInfo.errors, 'email')} value={regInfo.email} fluid name="email" icon="mail" iconPosition="left" placeholder="Email Address" type='email' onChange={handleChange} />
                        <Form.Input className={handleInputErrors(regInfo.errors, 'password')} value={regInfo.password} fluid name="password" icon="lock" iconPosition="left" placeholder="Password" type='password' onChange={handleChange} />
                        <Form.Input className={handleInputErrors(regInfo.errors, 'password')} value={regInfo.passwordConfirmation} fluid name="passwordConfirmation" icon="repeat" iconPosition="left" placeholder="Password Confirmation" type='password' onChange={handleChange} />

                        <Button disabled={regInfo.loading} className={regInfo.loading ? 'loading' : ''} color="violet" fluid size="large">Submit</Button>
                    </Segment>
                </Form>
                {regInfo.errors.length > 0 && (
                    <Message error>
                        <h3>Error</h3>
                        {displayErrors(regInfo.errors)}
                    </Message>
                )}
                <Message>Already a user? <Link to="/login">Login</Link></Message>
            </Grid.Column>
        </Grid>
    )
}
export default Register
