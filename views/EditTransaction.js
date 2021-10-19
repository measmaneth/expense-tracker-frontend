import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View, Text, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper.js";

import {
    StyledContainer,
    InnerContainer,
    EditTransactionTitle,
    TransactionDollar,
    TransactionDollarView,
    TransactionTextInput,
    StyledFormArea,
    CategoryText,
    CategoryIconBackground,
    CategoryIcon,
    CategoryRightWrapper,
    CategoryLeftWrapper,
    CategoryItemWrapper,
    CategoryTouch,
    IEIcon
} from "../components/AddTransactionStyles.js"

//Icon
import { Feather } from "@expo/vector-icons";

//formik
import { Formik } from "formik";
import TextInput from "../components/textinput/TextInput.js";

const EditTransaction = ({ route, navigation }) => {
    const data = route.params;
    useEffect(()=> {
        console.log(data);
    })
    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <InnerContainer>
                    <EditTransactionTitle>Edit Transaction</EditTransactionTitle>
                    <Formik
                        initialValues={{}}
                        onSubmit={(values) => {
                            console.log(values);
                        }}
                    >
                        {
                            ({ handleBlur, handleChange, handleSubmit, values }) => (
                                <StyledFormArea>
                                    <TransactionDollarView>
                                        <TransactionDollar>$ </TransactionDollar>
                                        <TransactionTextInput
                                            placeholder="0"
                                            keyboardType="decimal-pad"
                                        />
                                    </TransactionDollarView>
                                    <CategoryTouch onPress={() => navigation.navigate("Category")}>
                                        <Categories name={data?.item.name}  iconName={data?.item.icon} type={data?.item.type}/>
                                    </CategoryTouch>
                                </StyledFormArea>
                            )
                        }
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    )
}

const Categories = ({ name, iconName, type }) => {
    const [cname, setcname] = useState()
    useEffect(() => {
        setcname(name);
    },[name]);
    return (
      <CategoryItemWrapper>
        <CategoryLeftWrapper>
          <View>
            <CategoryIconBackground>
              <CategoryIcon>
                  <IEIcon  source={iconName}/>
              </CategoryIcon>
            </CategoryIconBackground>
          </View>
          <View>
            <CategoryText>{cname}</CategoryText>
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

export default EditTransaction