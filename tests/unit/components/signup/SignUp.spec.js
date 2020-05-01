import Vue from 'vue'
import Vuetify from 'vuetify'
import SignUp from '@/components/signup/SignUp.vue'
import {
  mount
} from '@vue/test-utils'

Vue.use(Vuetify)

describe('SignUp', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(SignUp, {
    })
  })

  it(
    'should display mail invalid message when mail is not conform', async () => {
      // Arrange
      wrapper.find('[data-test="mailText"]').setValue('maqsdqsdqsdqs.dom')
      wrapper.find('[data-test="usernameText"]').setValue('username')
      wrapper.find('[data-test="passwordText"]').setValue('password')
      wrapper.find('[data-test="signup-agreement"]').setChecked()

      // Act
      wrapper.vm.validate()
      await wrapper.vm.$nextTick()

      // Assert
      expect(wrapper.findAll('.v-messages__message').length).toBe(1)
      expect(wrapper.find('.v-messages__message').text()).toBe('E-mail must be valid')
    })

  it(
    'should display username invalid message when username is too short', async () => {
      // Arrange
      wrapper.find('[data-test="mailText"]').setValue('maqsdqsdqs@dqs.dom')
      wrapper.find('[data-test="usernameText"]').setValue('use')
      wrapper.find('[data-test="passwordText"]').setValue('password')
      wrapper.find('[data-test="signup-agreement"]').setChecked()

      // Act
      wrapper.vm.validate()
      await wrapper.vm.$nextTick()

      // Assert
      expect(wrapper.findAll('.v-messages__message').length).toBe(1)
      expect(wrapper.find('.v-messages__message').text()).toBe('At least 5 caracters, max 25')
    })

  it(
    'should display username invalid message when username has specials characters', async () => {
      // Arrange
      wrapper.find('[data-test="mailText"]').setValue('maqsdqsdqs@dqs.dom')
      wrapper.find('[data-test="usernameText"]').setValue('use+/qsjlhd')
      wrapper.find('[data-test="passwordText"]').setValue('password')
      wrapper.find('[data-test="signup-agreement"]').setChecked()

      // Act
      wrapper.vm.validate()
      await wrapper.vm.$nextTick()

      // Assert
      expect(wrapper.findAll('.v-messages__message').length).toBe(1)
      expect(wrapper.find('.v-messages__message').text()).toBe('No special caracters allowed except - and space')
    })

  it(
    'should display password invalid message when password is too short', async () => {
      // Arrange
      wrapper.find('[data-test="mailText"]').setValue('maqsdqsdqs@dqs.dom')
      wrapper.find('[data-test="usernameText"]').setValue('username')
      wrapper.find('[data-test="passwordText"]').setValue('pas')
      wrapper.find('[data-test="signup-agreement"]').setChecked()

      // Act
      wrapper.vm.validate()
      await wrapper.vm.$nextTick()

      // Assert
      expect(wrapper.findAll('.v-messages__message').length).toBe(1)
      expect(wrapper.find('.v-messages__message').text()).toBe('At least 6 caracters, max 25')
    })

  it(
    'should display agreement error message when agreement is not checked', async () => {
      // Arrange
      wrapper.find('[data-test="mailText"]').setValue('maqsdqsdqs@dqs.dom')
      wrapper.find('[data-test="usernameText"]').setValue('username')
      wrapper.find('[data-test="passwordText"]').setValue('password')

      // Act
      wrapper.vm.validate()
      await wrapper.vm.$nextTick()

      // Assert
      expect(wrapper.findAll('.v-messages__message').length).toBe(1)
      expect(wrapper.find('.v-messages__message').text()).toBe('You must agree to continue!')
    })

  it(
    'should have enabled button if all input fields are ok', async () => {
      // Arrange
      wrapper.find('[data-test="mailText"]').setValue('maqsdqsdqs@dqs.dom')
      wrapper.find('[data-test="usernameText"]').setValue('username')
      wrapper.find('[data-test="passwordText"]').setValue('password')
      wrapper.find('[data-test="signup-agreement"]').setChecked()

      // Act
      wrapper.vm.validate()
      await wrapper.vm.$nextTick()

      // Assert
      expect(wrapper.findAll('.v-messages__message').length).toBe(0)
      expect(wrapper.findAll('[disabled]').length).toBe(0)
    })

  it(
    'should have disabled button if all input fields are not ok', async () => {
      // Arrange
      wrapper.find('[data-test="mailText"]').setValue('maqsdqsddqs.dom')
      wrapper.find('[data-test="usernameText"]').setValue('us')
      wrapper.find('[data-test="passwordText"]').setValue('pa')
      wrapper.find('[data-test="signup-agreement"]').setChecked()

      // Act
      wrapper.vm.validate()
      await wrapper.vm.$nextTick()

      // Assert
      expect(wrapper.findAll('.v-messages__message').length).toBe(3)
      expect(wrapper.findAll('[disabled]').length).toBe(1)
    })
})
