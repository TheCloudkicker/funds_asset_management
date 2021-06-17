import React, { useState } from 'react'
import firebase from '../../firebase'
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react'

import { Link } from 'react-router-dom'



const Login = () => {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
        errors: [],
        loading: false,
    })

    const displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>)

    const handleChange = event => {
        event.persist()
        setLoginInfo(prevState => {
            return { ...prevState, [event.target.name]: event.target.value }
        })

    }

    const handleSubmit = event => {
        event.preventDefault();

        if (isFormValid(loginInfo)) {
            setLoginInfo(prevState => {
                return { ...prevState, errors: [], loading: true }
            })
            firebase
                .auth()
                .signInWithEmailAndPassword(loginInfo.email, loginInfo.password)
                .then(signedInUser => {
                    console.log(signedInUser)
                })
                .catch(err => {
                    console.error(err);
                    const newErrors = [...loginInfo.errors]
                    setLoginInfo(prevState => {
                        return {
                            ...prevState,
                            errors: newErrors.concat(err),
                            loading: false
                        }
                    })
                })

        }
    }

    const isFormValid = ({ email, password }) => email && password;

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
                    <Icon name="lock" color="violet" />
                        Login to Waibe
                    </Header>
                <Form onSubmit={handleSubmit} size="large">
                    <Segment stacked>
                        <Form.Input className={handleInputErrors(loginInfo.errors, 'email')} value={loginInfo.email} fluid name="email" icon="mail" iconPosition="left" placeholder="Email Address" type='email' onChange={handleChange} />
                        <Form.Input className={handleInputErrors(loginInfo.errors, 'password')} value={loginInfo.password} fluid name="password" icon="lock" iconPosition="left" placeholder="Password" type='password' onChange={handleChange} />

                        <Button disabled={loginInfo.loading} className={loginInfo.loading ? 'loading' : ''} color="violet" fluid size="large">Submit</Button>
                    </Segment>
                </Form>
                {loginInfo.errors.length > 0 && (
                    <Message error>
                        <h3>Error</h3>
                        {displayErrors(loginInfo.errors)}
                    </Message>
                )}
                <Message>
                    Don't have an account? <Link to="/register">Register</Link>
                </Message>
            </Grid.Column>
        </Grid>
    )
}

export default Login
