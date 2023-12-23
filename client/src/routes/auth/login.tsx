import { Route } from '@tanstack/react-router';
import { defaultLayoutRoute } from '../../layouts/default-layout';
import {
  TextInput,
  PasswordInput,
  Paper,
  Group,
  Button,
  rem,
  Flex,
  Checkbox,
  Anchor
} from '@mantine/core';
import { RecruitHubLogo } from '../../components/shared/logo/logo';
import { authenticationSchema, useAuthenticate } from '../../services/auth-service';

import { zodResolver } from 'mantine-form-zod-resolver';
import { useForm } from '@mantine/form';

export default function Login() {
  const { authenticate, mutation } = useAuthenticate();

  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },
    validate: zodResolver(authenticationSchema)
  });
  return (
    <Flex justify='center' align='center' h='100vh' w='100vw'>
      <Paper
        radius='lg'
        style={{
          padding: rem(40),
          maxWidth: '28rem',
          width: '100%'
        }}
        withBorder
        component='form'
        onSubmit={form.onSubmit(authenticate)}
      >
        <Flex justify='center' mb='md'>
          <RecruitHubLogo />
        </Flex>
        <TextInput label='Email' placeholder='your@gmail.com' {...form.getInputProps('email')} />
        <PasswordInput
          label='Password'
          placeholder='Your password'
          mt='md'
          {...form.getInputProps('password')}
        />
        <Group justify='apart' mt='lg'>
          <Checkbox label='Remember me' />
          <Anchor href='/forgot-password' size='sm'>
            {' '}
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt='xl' type='submit' loading={mutation.isPending}>
          Sign in
        </Button>
      </Paper>
    </Flex>
  );
}

export const loginRoute = new Route({
  path: 'login',
  component: Login,
  getParentRoute: () => defaultLayoutRoute
});
