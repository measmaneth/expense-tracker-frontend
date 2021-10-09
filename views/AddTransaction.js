import React from "react";
import { FlatList, Pressable, StyleSheet, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  StyledContainer,
  InnerContainer,
  TransactionView,
  TransactionTitle,
  TransactionDollar,
  TransactionDollarView,
  TransactionTextInput,
  CategoryTouch,
  CategoryItemWrapper,
  CategoryLeftWrapper,
  CategoryRightWrapper,
  CategoryText,
  CategoryIconBackground,
  CategoryIcon,
  StyledFormArea,
  StyledButton,
  StyledButtonText
} from "../components/AddTransactionStyles.js";

import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper.js";

//Icon
import { Feather } from "@expo/vector-icons";

//formik
import { Formik } from "formik";
import TextInput from "../components/textinput/TextInput.js";

const AddTransaction = ({ navigation }) => {
  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <InnerContainer>
          <TransactionView>
            <TransactionTitle>Add Transaction</TransactionTitle>
          </TransactionView>
          <Formik
            initialValues={{ Tamount: "", remark: "" }}
            onSubmit={(values) => {
              if (values.Tamount == "") {
                console.log("Please Fill in the Fields");
              } else {
                console.log("Transaction Amount: ", values.Tamount, "Remark: ", values.remark);
              }
            }}
          >{
              ({ handleBlur, handleChange, handleSubmit, values }) => (
                <StyledFormArea>
                  <TransactionDollarView>
                    <TransactionDollar>$ </TransactionDollar>
                    <TransactionTextInput
                      placeholder="0"
                      keyboardType="decimal-pad"
                      values={values.Tamount}
                      onBlur={handleBlur("Tamount")}
                      onChangeText={handleChange("Tamount")}
                    />
                  </TransactionDollarView>
                  <CategoryTouch onPress={() => navigation.navigate("Category")}>
                    <Categories name="Choose Category" iconName="gift" />
                  </CategoryTouch>
                  <TextInput
                    label="Remark"
                    placeholder="(Optional)"
                    values={values.remark}
                    onBlur={handleBlur("remark")}
                    onChangeText={handleChange("remark")}
                  />
                  <StyledButton onPress={handleSubmit}>
                    <StyledButtonText>Add</StyledButtonText>
                  </StyledButton>
                </StyledFormArea>

              )
            }

          </Formik>

        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const Categories = ({ name, iconName }) => {
  return (
    <CategoryItemWrapper>
      <CategoryLeftWrapper>
        <View>
          <CategoryIconBackground>
            <CategoryIcon>
              <Feather name={iconName} size={24} color="black" />
            </CategoryIcon>
          </CategoryIconBackground>
        </View>
        <View>
          <CategoryText>{name}</CategoryText>
        </View>
      </CategoryLeftWrapper>
      <CategoryRightWrapper>
        <View>
          <Feather name="chevron-right" size={24} color="black" />
        </View>
      </CategoryRightWrapper>
    </CategoryItemWrapper>
  );
};

export default AddTransaction;
