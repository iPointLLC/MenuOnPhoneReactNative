navigationOptions: ({navigation}) => ({
		headerTintColor: 'white',
		headerStyle: { paddingRight: 10, paddingLeft: 10, backgroundColor: '#d64f6d' },
		headerBackTitle: null,
		headerLeft: (
				<TouchableOpacity onPress={() => { navigation.navigate('DrawerOpen') }}>
					<Icon name='bars' size={30} color='white' />
				</TouchableOpacity>
			),
			headerRight: (
				<TouchableOpacity onPress={() => { navigation.navigate('Onboarding') }}>
					<Icon name='qrcode' size={30} color='white' style={{ marginHorizontal: 10, marginVertical: 5 }} />
				</TouchableOpacity>
			)
	})





	<View key={element.key} style={{ flexDirection: 'row', flex: 1 }}>
								<View style={{ flex: 1, borderBottomColor: 'red', borderBottomWidth: 1, marginLeft: 10,
												paddingVertical: 10 }}>
									<View>
										<Text style={{ fontSize: 18 }}>{index + 1}. {element.dish.name}</Text>
									</View>
									<View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
										<View style={{ marginRight: 10 }}>
											<Text style={{ fontSize: 16 }}>{this.calculatePriceForDish(element.key)}руб</Text>
										</View>
										<View style={{ marginRight: 10 }}>
											<Text style={{ fontSize: 16 }}>{this.calculateWeightForDish(element.key)}гр.</Text>
										</View>
										<View>
											<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
													borderWidth: 1, borderColor: '#d64f6d', borderRadius: 6,
													paddingHorizontal: 5 }}>
												<TouchableOpacity style={{ borderRightWidth: 1, borderRightColor: '#d64f6d', paddingRight: 5 }}
																	onPress={ () => this.orderDishCountChanged(element.key, -1) }>
													<Icon name='minus' size={20} />
												</TouchableOpacity>
												<Text style={{ marginHorizontal: 10 }}>{this.props.countTable[element.key]}</Text>
												<TouchableOpacity style={{ borderLeftWidth: 1, borderLeftColor: '#d64f6d', paddingLeft: 5  }}
																	onPress={ () => this.orderDishCountChanged(element.key, 1) }>
													<Icon name='plus' size={20} />
												</TouchableOpacity>
											</View>
										</View>
									</View>
								</View>

								<View style={{ justifyContent: 'center' }}>
									<TouchableOpacity style={{ paddingHorizontal: 10 }} 
														onPress={ () => { this.delecteIconPressed(element.key)}}>
										<Icon name='trash' size={30} />
									</TouchableOpacity>
								</View>
							</View>




							
				</View>
						<View >
							<Text style={{ fontSize: 16, marginVertical: 5 }}>{I18n.t('dishesCount')}: {this.props.dishesCount} {I18n.t('pieces')}.</Text>
						</View>
						
						<View>
							<Text style={{ fontSize: 16, marginVertical: 5 }}>{I18n.t('summaryPrice')}: {this.props.summaryPrice} {I18n.t('rubles')}</Text>
						</View>
						<View>
							<Text style={{ fontSize: 16, marginVertical: 5 }}>{I18n.t('summaryPriceWithTips')}(10%): {this.props.summaryPriceWithTips} {I18n.t('rubles')}</Text>
						</View>
						
					</View>